import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const usuarioSchema = new mongoose.Schema({
    nombreUsuario: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    estado: { type: String, enum: ['activo', 'inactivo'], default: 'activo' }
});

usuarioSchema.pre('save', function (next) {
    if (this.isModified('password')) {
        this.password = bcrypt.hashSync(this.password, 10);
    }
    next();
});

export default mongoose.model('Usuario', usuarioSchema);
