import mongoose from "mongoose";
import bcrypt from "bcrypt";

const SALT_ROUNDS = 12;


const capitalizeName = (v) => {
    if (typeof v !== "string") return v;
    const trimmed = v.trim();
    if (!trimmed) return trimmed;
    // Capitaliza cada palabra (maneja nombres compuestos)
    return trimmed
        .split(/\s+/)
        .map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
        .join(" ");
};

const UserSchema = new mongoose.Schema(
    {
        name: { type: String, required: true, set: capitalizeName },
        middleName: { type: String, required: false, set: capitalizeName },
        lastName: { type: String, required: true, set: capitalizeName },
        secondLastName: { type: String, required: false, set: capitalizeName },
        displayName: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true, select:false },
        roles: { type: [String], required: true },
    },
    {
        timestamps: true, // createdAt, updatedAt
    }
);

UserSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, SALT_ROUNDS);
    next();
});

UserSchema.set("toJSON", {
    transform: function (doc, ret) {
        delete ret.password;
        return ret;
    },
});

const UserModel = mongoose.models.User || mongoose.model("User", UserSchema);
export default UserModel;
