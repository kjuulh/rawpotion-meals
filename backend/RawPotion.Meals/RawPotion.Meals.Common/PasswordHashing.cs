using System;

namespace RawPotion.Meals.Common
{
    public static class PasswordHashing
    {
        public static string Hash(string clearText) =>
            BCrypt.Net.BCrypt.EnhancedHashPassword(clearText);

        public static bool Verify(string passwordHash, string clearText) =>
            BCrypt.Net.BCrypt.EnhancedVerify(clearText, passwordHash);
    }
}