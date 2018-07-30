using System;
using System.Collections.Generic;
using System.Linq;

namespace DSP.Foundation.Forms
{
    public class ControlModel<TProperty>
    {
        public ControlModel(string id, string name, TProperty value, string displayName, IList<ClientRule> rules = null,
             LabelOption labelOption = LabelOption.None)
        {
            Rules = rules ?? new List<ClientRule>();
            LabelOption = labelOption;
            DisplayName = displayName;
            Name = name;
            Id = id;
            Value = value;
        }

        public void AddRuleIfMissing(string name, string message, RuleType ruleType = RuleType.DataAttribute)
        {
            if (Rules.Any(rule => rule.Name.Equals(name, StringComparison.OrdinalIgnoreCase))) return;

            AddRule(name, message, ruleType);
        }

        public void AddRule(string name, string message, RuleType ruleType = RuleType.DataAttribute)
        {
            Rules.Add(new ClientRule(name, message, ruleType));
        }

        public bool IsRequired
            => Rules.Any(rule => rule.Name.Equals("required", StringComparison.InvariantCultureIgnoreCase));

        public bool HasId => !string.IsNullOrWhiteSpace(Id);

        public string Id { get; set; }
        public string Name { get; set; }
        public TProperty Value { get; set; }
        public IDictionary<string, object> Attributes { get; set; }
        public string DisplayName { get; set; }
        public IList<ClientRule> Rules { get; set; }
        public LabelOption LabelOption { get; set; }
        public string TooltipText { get; set; }
    }
}