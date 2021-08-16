using Microsoft.EntityFrameworkCore.Migrations;

namespace RawPotion.Meals.Persistence.Data.Migrations
{
    public partial class AddParticipatingMembers : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "MealUser",
                columns: table => new
                {
                    ParticipatingMealsId = table.Column<int>(type: "integer", nullable: false),
                    ParticipatingMembersId = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MealUser", x => new { x.ParticipatingMealsId, x.ParticipatingMembersId });
                    table.ForeignKey(
                        name: "FK_MealUser_Meals_ParticipatingMealsId",
                        column: x => x.ParticipatingMealsId,
                        principalTable: "Meals",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_MealUser_User_ParticipatingMembersId",
                        column: x => x.ParticipatingMembersId,
                        principalTable: "User",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_MealUser_ParticipatingMembersId",
                table: "MealUser",
                column: "ParticipatingMembersId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "MealUser");
        }
    }
}
