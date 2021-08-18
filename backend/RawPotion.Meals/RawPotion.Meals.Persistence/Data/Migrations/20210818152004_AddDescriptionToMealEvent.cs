using Microsoft.EntityFrameworkCore.Migrations;

namespace RawPotion.Meals.Persistence.Data.Migrations
{
    public partial class AddDescriptionToMealEvent : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Description",
                table: "Meals",
                type: "text",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Description",
                table: "Meals");
        }
    }
}
