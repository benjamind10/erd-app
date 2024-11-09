import mongoose, { Document, Schema } from 'mongoose';

/**
 * IFeeding interface represents a Feeding record, including information about
 * the feeding time, amount, and metadata for creation and editing.
 *
 * @property feedingTime - Time of the feeding, input by the user.
 * @property addedAt - Date and time the record was created, auto-generated.
 * @property updatedAt - Date and time the record was last updated, auto-generated.
 * @property addedBy - Identifier for the user who created the record, auto-generated.
 * @property editedBy - Identifier for the user who last edited the record, auto-generated.
 * @property amount - Amount of the feeding in ounces, input by the user.
 * @property dha - Indicates if DHA was included, optional.
 */
export interface IFeeding extends Document {
  feedingTime: Date;
  addedAt: Date;
  updatedAt: Date;
  addedBy: mongoose.Types.ObjectId;
  editedBy: mongoose.Types.ObjectId;
  amount: number;
  dha?: boolean;
}

// Feeding schema fields definition
const feedingFields = {
  feedingTime: { type: Date, required: true },   // User-provided feeding time
  addedAt: { type: Date, default: Date.now },    // Auto-generated creation date
  updatedAt: { type: Date, default: Date.now },  // Auto-generated update date
  addedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },  // User who added the record
  editedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },  // Last editor of the record
  amount: { type: Number, required: true },      // Feeding amount in ounces
  dha: { type: Boolean, default: false },        // Optional DHA inclusion flag
};

// Create a Mongoose schema for the Feeding model
const FeedingSchema: Schema<IFeeding> = new Schema(feedingFields, { timestamps: { createdAt: 'addedAt', updatedAt: 'updatedAt' } });

// Export the Feeding model
export const Feeding = mongoose.model<IFeeding>('Feeding', FeedingSchema);
