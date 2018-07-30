using System;
using System.Collections.Generic;
using System.Linq;

namespace DSP.Foundation.AdditionalRenderingContext
{
    public class AdditionalContextStore : IAdditionalContextStore
    {
        private readonly IDictionary<Type, object> contextObjects = new Dictionary<Type, object>();
        
        public void Add<TContext>(TContext message)
        {
            this.contextObjects[typeof(TContext)] = message;
        }

        public TContext Get<TContext>()
        {
            return
                this.contextObjects.Keys.Where(mt => typeof(TContext).IsAssignableFrom(mt))
                    .Select(t => (TContext) this.contextObjects[t])
                    .ToArray()
                    .FirstOrDefault();
        }
    }
}
