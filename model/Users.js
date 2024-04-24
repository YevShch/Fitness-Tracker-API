import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema( {
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
} );

userSchema.pre( 'save', async function ( next ) {
  try {
    const user = this;
    if ( !user.isModified( 'password' ) ) return next();
    const hashedPassword = await bcrypt.hash( user.password, 10 );
    user.password = hashedPassword;
    next();
  } catch ( error ) {
    next( error );
  }
} );

userSchema.path( 'email' ).validate( async function ( value ) {
  const userCount = await this.model( 'User' ).countDocuments( { email: value } );
  return !userCount;
}, 'Email must be unique' );

const User = mongoose.model( 'User', userSchema );

export default User;


