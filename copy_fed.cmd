REM source control
xcopy "C:\Projects\middleman\build\assets" "C:\Projects\dsp-starter-project\src\Sites\dspstarter\code\DSP.Site.Dspstarter\assets" /sy
REM deploy
xcopy "C:\Projects\middleman\build\assets" "C:\inetpub\wwwroot\xp0.sc\assets" /sy