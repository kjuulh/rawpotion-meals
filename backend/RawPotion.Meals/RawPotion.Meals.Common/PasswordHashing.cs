namespace RawPotion.Meals.Common
{
    public static class PasswordHashing
    {
        public static string Hash(
            string clearText)
        {
            return BCrypt.Net.BCrypt.EnhancedHashPassword(clearText);
        }

        public static bool Verify(
            string passwordHash,
            string clearText)
        {
            return BCrypt.Net.BCrypt.EnhancedVerify(
                clearText,
                passwordHash);
        }
    }
}