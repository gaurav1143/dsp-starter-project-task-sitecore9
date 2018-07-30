namespace DSP.Foundation.AdditionalRenderingContext
{
    /// <summary>
    /// Defines the basic methods of a cross-rendering messaging bus.
    /// </summary>
    public interface IAdditionalContextStore 
    {
        /// <summary>
        /// Publishes a message to the bus. Any existing subscriptions to this type,
        /// or an assignable type such as a base class or an interface, will be notified
        /// at this time.
        /// </summary>
        /// <typeparam name="TMessage">The type of the message to publish</typeparam>
        /// <param name="message">The message to publish</param>
        void Add<TRenderingContext>(TRenderingContext renderingContext);

        /// <summary>
        /// Registers a subscription to messages of the specified type. Any previously
        /// published messages that are valid for this subscription will be raised
        /// at this time.
        /// </summary>
        /// <typeparam name="TMessage">The type of messages to subscribe to</typeparam>
        /// <param name="messageReceivedCallback">A callback that will be invoked for each message received. This callback will be invoked once per message.</param>
        TRenderingContext Get<TRenderingContext>();
    }
}
