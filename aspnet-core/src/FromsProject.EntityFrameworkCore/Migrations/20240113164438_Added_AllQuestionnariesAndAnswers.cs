using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace FromsProject.Migrations
{
    public partial class Added_AllQuestionnariesAndAnswers : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "AppHeaderQuestionnarie",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Title = table.Column<string>(type: "nvarchar(560)", maxLength: 560, nullable: false),
                    Description = table.Column<string>(type: "nvarchar(2080)", maxLength: 2080, nullable: true),
                    isRequired = table.Column<bool>(type: "bit", nullable: false),
                    CreationTime = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CreatorUserId = table.Column<long>(type: "bigint", nullable: true),
                    LastModificationTime = table.Column<DateTime>(type: "datetime2", nullable: true),
                    LastModifierUserId = table.Column<long>(type: "bigint", nullable: true),
                    IsDeleted = table.Column<bool>(type: "bit", nullable: false),
                    DeleterUserId = table.Column<long>(type: "bigint", nullable: true),
                    DeletionTime = table.Column<DateTime>(type: "datetime2", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AppHeaderQuestionnarie", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "AppSection",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    HeaderQuestionnarieId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Title = table.Column<string>(type: "nvarchar(480)", maxLength: 480, nullable: false),
                    Description = table.Column<string>(type: "nvarchar(2080)", maxLength: 2080, nullable: true),
                    SubTitle = table.Column<string>(type: "nvarchar(480)", maxLength: 480, nullable: true),
                    CreationTime = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CreatorUserId = table.Column<long>(type: "bigint", nullable: true),
                    LastModificationTime = table.Column<DateTime>(type: "datetime2", nullable: true),
                    LastModifierUserId = table.Column<long>(type: "bigint", nullable: true),
                    IsDeleted = table.Column<bool>(type: "bit", nullable: false),
                    DeleterUserId = table.Column<long>(type: "bigint", nullable: true),
                    DeletionTime = table.Column<DateTime>(type: "datetime2", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AppSection", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AppSection_AppHeaderQuestionnarie_HeaderQuestionnarieId",
                        column: x => x.HeaderQuestionnarieId,
                        principalTable: "AppHeaderQuestionnarie",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AppQuestion",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Title = table.Column<string>(type: "nvarchar(480)", maxLength: 480, nullable: false),
                    Description = table.Column<string>(type: "nvarchar(2080)", maxLength: 2080, nullable: true),
                    SectionId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    HeaderQuestionnarieId = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    CreationTime = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CreatorUserId = table.Column<long>(type: "bigint", nullable: true),
                    LastModificationTime = table.Column<DateTime>(type: "datetime2", nullable: true),
                    LastModifierUserId = table.Column<long>(type: "bigint", nullable: true),
                    IsDeleted = table.Column<bool>(type: "bit", nullable: false),
                    DeleterUserId = table.Column<long>(type: "bigint", nullable: true),
                    DeletionTime = table.Column<DateTime>(type: "datetime2", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AppQuestion", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AppQuestion_AppHeaderQuestionnarie_HeaderQuestionnarieId",
                        column: x => x.HeaderQuestionnarieId,
                        principalTable: "AppHeaderQuestionnarie",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_AppQuestion_AppSection_SectionId",
                        column: x => x.SectionId,
                        principalTable: "AppSection",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AppAlternativeQuestionnarie",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    QuestionId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Title = table.Column<string>(type: "nvarchar(480)", maxLength: 480, nullable: false),
                    Value = table.Column<string>(type: "nvarchar(480)", maxLength: 480, nullable: true),
                    Type = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    HeaderQuestionnarieId = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    CreationTime = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CreatorUserId = table.Column<long>(type: "bigint", nullable: true),
                    LastModificationTime = table.Column<DateTime>(type: "datetime2", nullable: true),
                    LastModifierUserId = table.Column<long>(type: "bigint", nullable: true),
                    IsDeleted = table.Column<bool>(type: "bit", nullable: false),
                    DeleterUserId = table.Column<long>(type: "bigint", nullable: true),
                    DeletionTime = table.Column<DateTime>(type: "datetime2", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AppAlternativeQuestionnarie", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AppAlternativeQuestionnarie_AppHeaderQuestionnarie_HeaderQuestionnarieId",
                        column: x => x.HeaderQuestionnarieId,
                        principalTable: "AppHeaderQuestionnarie",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_AppAlternativeQuestionnarie_AppQuestion_QuestionId",
                        column: x => x.QuestionId,
                        principalTable: "AppQuestion",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AppAnswersToEvaluation",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    HeaderQuestionnarieId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    SectionId = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    QuestionId = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    TextOfAlternatives = table.Column<string>(type: "nvarchar(1080)", maxLength: 1080, nullable: true),
                    ValueOfAlternatives = table.Column<string>(type: "nvarchar(1080)", maxLength: 1080, nullable: true),
                    ValueOfHeader = table.Column<string>(type: "nvarchar(1080)", maxLength: 1080, nullable: true),
                    ValueOfSections = table.Column<string>(type: "nvarchar(1080)", maxLength: 1080, nullable: true),
                    CreationTime = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CreatorUserId = table.Column<long>(type: "bigint", nullable: true),
                    LastModificationTime = table.Column<DateTime>(type: "datetime2", nullable: true),
                    LastModifierUserId = table.Column<long>(type: "bigint", nullable: true),
                    IsDeleted = table.Column<bool>(type: "bit", nullable: false),
                    DeleterUserId = table.Column<long>(type: "bigint", nullable: true),
                    DeletionTime = table.Column<DateTime>(type: "datetime2", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AppAnswersToEvaluation", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AppAnswersToEvaluation_AppHeaderQuestionnarie_HeaderQuestionnarieId",
                        column: x => x.HeaderQuestionnarieId,
                        principalTable: "AppHeaderQuestionnarie",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_AppAnswersToEvaluation_AppQuestion_QuestionId",
                        column: x => x.QuestionId,
                        principalTable: "AppQuestion",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_AppAnswersToEvaluation_AppSection_SectionId",
                        column: x => x.SectionId,
                        principalTable: "AppSection",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_AppAlternativeQuestionnarie_HeaderQuestionnarieId",
                table: "AppAlternativeQuestionnarie",
                column: "HeaderQuestionnarieId");

            migrationBuilder.CreateIndex(
                name: "IX_AppAlternativeQuestionnarie_QuestionId",
                table: "AppAlternativeQuestionnarie",
                column: "QuestionId");

            migrationBuilder.CreateIndex(
                name: "IX_AppAnswersToEvaluation_HeaderQuestionnarieId",
                table: "AppAnswersToEvaluation",
                column: "HeaderQuestionnarieId");

            migrationBuilder.CreateIndex(
                name: "IX_AppAnswersToEvaluation_QuestionId",
                table: "AppAnswersToEvaluation",
                column: "QuestionId");

            migrationBuilder.CreateIndex(
                name: "IX_AppAnswersToEvaluation_SectionId",
                table: "AppAnswersToEvaluation",
                column: "SectionId");

            migrationBuilder.CreateIndex(
                name: "IX_AppQuestion_HeaderQuestionnarieId",
                table: "AppQuestion",
                column: "HeaderQuestionnarieId");

            migrationBuilder.CreateIndex(
                name: "IX_AppQuestion_SectionId",
                table: "AppQuestion",
                column: "SectionId");

            migrationBuilder.CreateIndex(
                name: "IX_AppSection_HeaderQuestionnarieId",
                table: "AppSection",
                column: "HeaderQuestionnarieId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "AppAlternativeQuestionnarie");

            migrationBuilder.DropTable(
                name: "AppAnswersToEvaluation");

            migrationBuilder.DropTable(
                name: "AppQuestion");

            migrationBuilder.DropTable(
                name: "AppSection");

            migrationBuilder.DropTable(
                name: "AppHeaderQuestionnarie");
        }
    }
}
