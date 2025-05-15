const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

UserSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};

UserSchema.pre("save", async function () {
    if (this.isModified("password")) {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
    }
});

const User = mongoose.model("User", UserSchema);
module.exports = User;
