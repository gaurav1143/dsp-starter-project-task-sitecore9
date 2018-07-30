/// <binding />
var gulp = require('gulp');
var msbuild = require("gulp-msbuild");
var debug = require("gulp-debug");
var foreach = require("gulp-foreach");
var rename = require("gulp-rename");
var watch = require("gulp-watch");
var merge = require("merge-stream");
var newer = require("gulp-newer");
var util = require("gulp-util");
var runSequence = require("run-sequence");
var path = require("path");
var config = require("./gulp-config.js")();
var nugetRestore = require('gulp-nuget-restore');
var fs = require('fs');
var mkdirp = require('mkdirp');
var unicorn = require("./scripts/unicorn.js");
var xmlpoke = require("xmlpoke");
var exec = require('child_process').exec;
var xunit = require('gulp-xunit-runner');

module.exports.config = config;

gulp.task("default", function (callback) {
    config.runCleanBuilds = true;
    return runSequence(
      "01-Nuget-Restore",
      "02-Publish-All-Projects",
      "03-Apply-WebConfig-Transform",
      "04-Apply-SitecoreConfig-Transform",
      callback);
});

/*****************************
  Initial setup
*****************************/

gulp.task("01-Nuget-Restore", function (callback) {
    var solution = "./src/" + config.solutionName + ".sln";
    return gulp.src(solution).pipe(nugetRestore());
});

gulp.task("02-Publish-All-Projects", function (callback) {
    return runSequence(
      "Build-Solution",
      "Publish-Foundation-Projects",
      "Publish-Feature-Projects",
      "Publish-Site-Projects", callback);
});

gulp.task("03-Apply-WebConfig-Transform", function () {
    return applyWebConfigTransform();
});

gulp.task("04-Apply-SitecoreConfig-Transform", function () {
    return applySitecoreConfigTransform();
});

var applyWebConfigTransform = function (env, dest) {
    env = env || "Debug"; // no parameter - run "debug" locally
    dest = dest || config.websiteRoot;
    // copy foundation web.config
    gulp.src("./src/Foundation/code/DSP.Foundation/web.config").pipe(gulp.dest(dest));

    // find common and environment specific transformations in the order Foundation - Features - Sites 
    var transforms = [
        "./src/Foundation/**/web.common.config",
        "./src/Features/**/web.common.config",
        "./src/Sites/**/web.common.config",
        "./src/Foundation/**/web." + env + ".config",
        "./src/Features/**/web." + env + ".config",
        "./src/Sites/**/web." + env + ".config",
        "!./src/**/obj/**/web.common.config",
        "!./src/**/obj/**/web." + env + ".config"
    ];

    return gulp.src(transforms)
        .pipe(foreach(function (stream, transformFile) {
            util.log("Applying configuration transform: " + transformFile.path)
            return gulp.src("./applytransform.targets")
                .pipe(msbuild({
                    targets: ["ApplyTransform"],
                    configuration: config.buildConfiguration,
                    logCommand: false,
                    verbosity: "quiet",
                    stdout: true,
                    errorOnFail: true,
                    maxcpucount: 0,
                    toolsVersion: 15.0,
                    properties: {
                        SourceConfig: dest + "/web.config",
                        TransformFile: transformFile.path,
                        TargetConfig: dest + "/web.config"
                    }
                }));
        }));
}

var applySitecoreConfigTransform = function (env, dest) {
    util.log('entered applySitecoreConfigTransform for ' + env + " and " + dest);

    env = env || "Debug"; // no parameter - run "debug" locally
    dest = dest || config.websiteRoot;

    // find environment specific sitecore patch transformations in the order Foundation - Features - Sites 
    var transforms = [
        ".\\src\\Foundation\\**\\App_Config\\**\\*." + env + ".config",
        ".\\src\\Features\\**\\App_Config\\**\\*." + env + ".config",
        ".\\src\\Sites\\**\\App_Config\\**\\*." + env + ".config",
        "!.\\src\\**\\obj\\**\\*.config",
    ];

    util.log('about to call transforms for ' + transforms);

    return gulp.src(transforms)
        .pipe(foreach(function (stream, transformFile) {

            util.log("Applying patch transform: " + transformFile.path);
            
            var fileToTransform = transformFile.path.replace("." + env + ".config", ".config");
            var target = fileToTransform.split("App_Config")[1];
            
            util.log("Base: " + fileToTransform);
            util.log("Target: " + target);
            
            // copy un-transformed file 
            var targetFileName = dest + "\\App_Config" + target;
            var directoryName = targetFileName.replace(/[^\\]*$/, '');

            util.log("ensure " + directoryName + " exists")
            // make the target dir and any parent folders required
            mkdirp(directoryName, function (err) {
                if (err) console.error(err)
                else console.log('directory "' + directoryName +'" created')
            });
            
            return gulp.src(".\\applytransform.targets")
                .pipe(msbuild({
                    targets: ["ApplyTransform"],
                    configuration: config.buildConfiguration,
                    logCommand: false,
                    verbosity: "quiet",
                    stdout: true,
                    errorOnFail: true,
                    maxcpucount: 0,
                    toolsVersion: 15.0,
                    properties: {
                        SourceConfig: fileToTransform,
                        TransformFile: transformFile.path,
                        TargetConfig: targetFileName
                    }
                }));
        }));
}

/*****************************
  Publish
*****************************/
var publishProjects = function (location, dest) {
    dest = dest || config.websiteRoot;
    var targets = ["Build"];

    console.log("publish to " + dest + " folder");
    return gulp.src([location + "/**/code/**/*.csproj"])
      .pipe(foreach(function (stream, file) {
          return stream
            .pipe(debug({ title: "Building project:" }))
            .pipe(msbuild({
                targets: targets,
                configuration: config.buildConfiguration,
                logCommand: false,
                verbosity: "minimal",
                stdout: true,
                errorOnFail: true,
                maxcpucount: 0,
                toolsVersion: 15.0,
                properties: {
                    DeployOnBuild: "true",
                    DeployDefaultTarget: "WebPublish",
                    WebPublishMethod: "FileSystem",
                    DeleteExistingFiles: "false",
                    publishUrl: dest,
                    _FindDependencies: "true"
                }
            }));
      }));
};

gulp.task("Build-Solution", function () {
    var targets = ["Build"];
    if (config.runCleanBuilds) {
        targets = ["Clean", "Build"];
    }
    var solution = "./src/" + config.solutionName + ".sln";
    return gulp.src(solution)
        .pipe(msbuild({
            targets: targets,
            configuration: config.buildConfiguration,
            logCommand: false,
            verbosity: "minimal",
            stdout: true,
            errorOnFail: true,
            maxcpucount: 0,
            toolsVersion: 15.0
        }));
});

gulp.task("Publish-Foundation-Projects", function () {
    return publishProjects("./src/Foundation");
});

gulp.task("Publish-Feature-Projects", function () {
    return publishProjects("./src/Features");
});

gulp.task("Publish-Site-Projects", function () {
    return publishProjects("./src/Sites");
});

/***************
* CI Buid
****************/

gulp.task("ZZ-CI-Build-Configs", function (callback) {
    config.websiteRoot = path.resolve("../Working/Config"); // assume the default Bamboo config

    // TODO make this less verbose. I suck at gulp. 
    return runSequence(
      "Build-WebConfig-Debug",
      "Build-SitecoreConfig-Debug",
      "Build-WebConfig-Integration",
      "Build-SitecoreConfig-Integration",
      "Build-WebConfig-Test.Auth",
      "Build-SitecoreConfig-Test.Auth",
      "Build-WebConfig-Test.Delivery",
      "Build-SitecoreConfig-Test.Delivery",
      callback);
});

gulp.task("ZZ-CI-Build-AllProjects", function (callback) {
    config.websiteRoot = path.resolve("../Working/Website"); // assume the default Bamboo config
    config.buildConfiguration = "Release";

    return runSequence(
      "02-Publish-All-Projects",
      callback);
});

gulp.task("ZZ-CI-Build-AllUnicornItems", function (callback) {
    return runSequence(
      "ZZ-CI-Build-Unicorn",
      "ZZ-CI-Build-UnicornContent",
      callback);
});

gulp.task("ZZ-CI-Build-Unicorn", function () {
    var itemPaths = [];
    return gulp.src("./src/**/serialization/**/*.yml").pipe(gulp.dest(path.resolve("../Working/Unicorn")));
});

gulp.task("ZZ-CI-Build-UnicornContent", function () {
    var itemPaths = [];
    return gulp.src("./src/**/serialization.content/**/*.yml").pipe(gulp.dest(path.resolve("../Working/Unicorn.Content")));
});

gulp.task("Build-WebConfig-Debug", function () {
    return applyWebConfigTransform("Debug", config.websiteRoot + "\\Debug");
});

gulp.task("Build-SitecoreConfig-Debug", function () {
    return applySitecoreConfigTransform("Debug", config.websiteRoot + "\\Debug");
});

gulp.task("Build-WebConfig-Integration", function () {
    return applyWebConfigTransform("Integration", config.websiteRoot + "\\Integration");
});

gulp.task("Build-SitecoreConfig-Integration", function () {
    return applySitecoreConfigTransform("Integration", config.websiteRoot + "\\Integration");
});

gulp.task("Build-WebConfig-Test.Auth", function () {
    return applyWebConfigTransform("Test.Auth", config.websiteRoot + "\\Test.Auth");
});

gulp.task("Build-SitecoreConfig-Test.Auth", function () {
    return applySitecoreConfigTransform("Test.Auth", config.websiteRoot + "\\Test.Auth");
});

gulp.task("Build-WebConfig-Test.Delivery", function () {
    return applyWebConfigTransform("Test.Delivery", config.websiteRoot + "\\Test.Delivery");
});

gulp.task("Build-SitecoreConfig-Test.Delivery", function () {
    return applySitecoreConfigTransform("Test.Delivery", config.websiteRoot + "\\Test.Delivery");
});