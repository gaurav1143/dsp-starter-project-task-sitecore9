using System.Collections.Generic;
using DSP.Foundation.Forms;
using HtmlTags;

namespace DSP.Foundation.Forms.Elements
{
    public static class HtmlTagExtensions
    {
        public static HtmlTag AddRules(this HtmlTag tag, IList<ClientRule> rules)
        {
            foreach (var rule in rules)
            {
                switch (rule.RuleType)
                {
                    case RuleType.DataAttribute:
                        tag.Data($"rule-{rule.Name}", true);
                        tag.Data($"msg-{rule.Name}", rule.Message);
                        break;

                    case RuleType.HtmlAttribute:
                        tag.Attr(rule.Name, rule.Message);
                        break;
                }
            }

            return tag;
        }
    }
}