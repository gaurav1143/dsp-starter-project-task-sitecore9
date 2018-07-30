# Foundation Html Controls

These controls have been built using the [HtmlTags library](https://github.com/HtmlTags/htmltags).  
This allows using a fluent builder to construct the tag, but more importantly allows the developer to further customise the control in the razor markup.

When we built these we did not have too clear an idea of what we needed. We have a better idea now.

- align to the FED ruby controls as much as possible
- The core of a control is the input field, the rest (control holder, lables etc.) are decorations
- Each control that wraps an *INPUT* or *SELECT* element should implement *IInputControl**
- The *IInputControl.Inner* should be the *INPUT* or *SELECT* element

These controls should be cleaned up and standardised in their implementation.

