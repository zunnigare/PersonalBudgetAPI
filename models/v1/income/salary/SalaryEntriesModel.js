import mongoose from "mongoose";

const EntrySchema = new mongoose.Schema(
    {
        date: { type: Date, required: true },
        periodicity: {
            type: String,
            required: true,
            enum: ["weekly", "fortnightly", "monthly"],
            lowercase: true,
            trim: true,
        },
        label: { type: String, required: true },
        average: { type: Number, default: null },
        amounts: {
            type: [Number],
            default: [],
            validate: {
                validator: (arr) =>
                    Array.isArray(arr) && arr.every((n) => typeof n === "number" && !Number.isNaN(n)),
                message: "Amounts must be an array of numbers.",
            },
        },
        dates:{
            type: [Date],
            default:[],
        }
    },
    {
        timestamps: true, // createdAt, updatedAt
    }
);

EntrySchema.pre("save", function (next) {
    if ((this.average === null || this.average === undefined) && Array.isArray(this.amounts) && this.amounts.length > 0) {
        const sum = this.amounts.reduce((acc, n) => acc + n, 0);
        this.average = sum / this.amounts.length;
    }
    // Actualiza updatedate cada vez que se guarda
    this.updatedate = new Date();
    next();
});

// Índice extra
EntrySchema.index({ nombre: 1 });

const EntryModel = mongoose.models.Entry || mongoose.model("Entry", EntrySchema);
export default EntryModel;
