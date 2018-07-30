namespace DSP.Foundation.Forms
{
    public class ClientRule
    {
        public ClientRule(string name, string message, RuleType ruleType)
        {
            Name = name;
            Message = message;
            RuleType = ruleType;
        }

        /// <summary>
        /// Client rule name, used to geerate the data-rule-{Name} or as a html attribute, e.g. {name}="..."
        /// </summary>
        public string Name { get; set; }

        /// <summary>
        /// Client rule message, used to generate the data-msg-{Name}="{Message}" or as the html attribute value.
        /// </summary>
        public string Message { get; set; }

        /// <summary>
        /// The rule type, either data-  rule or html attribute rule.
        /// </summary>
        public RuleType RuleType { get; set; }
    }
}