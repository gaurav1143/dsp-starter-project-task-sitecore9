<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="GenerateDocumentation.aspx.cs" Inherits="DSP.Foundation.sitecore.admin.GenerateDocumentation" %>

<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>Template Documentation</title>
</head>
<body>
    <form id="form1" runat="server">
        <div>
            <% foreach (var t in this.Templates)
                { %>
            <h1><%= t.FullName %></h1>
            <p>
                <b>Inherits</b>: 
                <%= string.Join(", ", t.BaseTemplates.Select(x => x.DisplayName)) %>
            </p>
            <p>
                <b>Fields</b>: 
                <% if (t.OwnFields.Any())
                    { %>
                In addition to inherited fields, the template has the following fields
                <% }
                else
                { %>
                None
                <% } %>
            </p>
            <% if (t.OwnFields.Any())
                { %>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Data Type</th>
                        <th>Validation</th>
                        <th>Description</th>
                        <th>Choice Values</th>
                        <th>Default Values</th>
                    </tr>
                </thead>
                <tbody>
                    <% foreach (var f in t.OwnFields)
                        { %>
                    <tr>
                        <td><%= f.Name %></td>
                        <td><%= f.Type %></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                    <% } %>
                </tbody>
            </table>
            <% } %>
            <p></p>
            <p></p>
            <% } %>
        </div>
    </form>
</body>
</html>
