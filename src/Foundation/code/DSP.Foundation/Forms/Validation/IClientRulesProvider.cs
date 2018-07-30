using System.Collections.Generic;

namespace DSP.Foundation.Forms.Validation
{
    public interface IClientRulesProvider
    {
        IEnumerable<ClientRule> Rules();
    }
}
