using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace RawPotion.Meals.Persistence.Data.Migrations
{
    public partial class UpdateRefreshTokensWithRevoked : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "Token",
                table: "RefreshToken",
                type: "text",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "text",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "CreatedByIp",
                table: "RefreshToken",
                type: "text",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "text",
                oldNullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "IsActive",
                table: "RefreshToken",
                type: "boolean",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<string>(
                name: "ReasonRevoked",
                table: "RefreshToken",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "ReplacedByToken",
                table: "RefreshToken",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "Revoked",
                table: "RefreshToken",
                type: "timestamp without time zone",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<string>(
                name: "RevokedByIp",
                table: "RefreshToken",
                type: "text",
                nullable: false,
                defaultValue: "");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsActive",
                table: "RefreshToken");

            migrationBuilder.DropColumn(
                name: "ReasonRevoked",
                table: "RefreshToken");

            migrationBuilder.DropColumn(
                name: "ReplacedByToken",
                table: "RefreshToken");

            migrationBuilder.DropColumn(
                name: "Revoked",
                table: "RefreshToken");

            migrationBuilder.DropColumn(
                name: "RevokedByIp",
                table: "RefreshToken");

            migrationBuilder.AlterColumn<string>(
                name: "Token",
                table: "RefreshToken",
                type: "text",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "text");

            migrationBuilder.AlterColumn<string>(
                name: "CreatedByIp",
                table: "RefreshToken",
                type: "text",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "text");
        }
    }
}
