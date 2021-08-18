using System;
using System.Text.Json.Serialization;

namespace RawPotion.Meals.Domain.Entities
{
    public class RefreshToken
    {
        [JsonIgnore]
        public int Id { get; set; }

        public string Token { get; set; }
        public DateTime Expires { get; set; }
        public DateTime Created { get; set; }
        public string CreatedByIp { get; set; }
        public User User { get; set; }
        public bool IsActive => !IsRevoked && !IsExpired;
        public bool IsExpired => DateTime.UtcNow >= Expires;
        public bool IsRevoked => Revoked is not null;
        public DateTime? Revoked { get; set; }
        public string? RevokedByIp { get; set; }
        public string? ReasonRevoked { get; set; }
        public string? ReplacedByToken { get; set; }
    }
}