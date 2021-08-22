using Microsoft.EntityFrameworkCore.Migrations;

namespace RawPotion.Meals.Persistence.Data.Migrations
{
    public partial class AddChangedIsActive : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsActive",
                table: "RefreshToken");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "IsActive",
                table: "RefreshToken",
                type: "boolean",
                nullable: false,
                defaultValue: true);
        }
    }
}
