using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace API.Migrations
{
    /// <inheritdoc />
    public partial class UserEntityUpdated : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "phoneNo",
                table: "AnmolUsers",
                newName: "PhoneNo");

            migrationBuilder.AlterColumn<long>(
                name: "PhoneNo",
                table: "AnmolUsers",
                type: "bigint",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddColumn<byte[]>(
                name: "PasswordHash",
                table: "AnmolUsers",
                type: "varbinary(max)",
                nullable: false,
                defaultValue: new byte[0]);

            migrationBuilder.AddColumn<byte[]>(
                name: "PasswordSalt",
                table: "AnmolUsers",
                type: "varbinary(max)",
                nullable: false,
                defaultValue: new byte[0]);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "PasswordHash",
                table: "AnmolUsers");

            migrationBuilder.DropColumn(
                name: "PasswordSalt",
                table: "AnmolUsers");

            migrationBuilder.RenameColumn(
                name: "PhoneNo",
                table: "AnmolUsers",
                newName: "phoneNo");

            migrationBuilder.AlterColumn<int>(
                name: "phoneNo",
                table: "AnmolUsers",
                type: "int",
                nullable: false,
                oldClrType: typeof(long),
                oldType: "bigint");
        }
    }
}
