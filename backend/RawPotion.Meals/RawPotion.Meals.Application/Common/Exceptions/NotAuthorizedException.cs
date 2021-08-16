using System;

namespace RawPotion.Meals.Application.Common.Exceptions
{
    public class NotAuthorizedException : Exception
    {
        public NotAuthorizedException()
            : base()
        {
        }

        public NotAuthorizedException(string message)
            : base(message)
        {
        }

        public NotAuthorizedException(string message, Exception innerException)
            : base(message, innerException)
        {
        }

        public NotAuthorizedException(string name, object key)
            : base($"Entity \"{name}\" ({key}) was not authorized")
        {
        }
    }
}