import { Feeding, IFeeding } from '../models/feeding';
import { IUser } from '../models/users';
import { getLocalTimeWithDST } from '../utilities/helpers';

export const feedingResolvers = {
  Query: {
    /**
     * Retrieves a feeding record by its unique ID and returns a formatted feedingTime for display.
     * @param _parent - Unused parent parameter.
     * @param args - Object containing the ID of the feeding record to retrieve.
     * @returns The feeding record with both raw and formatted feedingTime if found; otherwise, null.
     */
    getFeeding: async (_parent: undefined, args: { id: string }) => {
      const feeding = await Feeding.findById(args.id);
      if (!feeding) return null;

      // Return both the original and formatted feedingTime, and map _id to id
      return {
        ...feeding.toObject(),
        id: feeding._id.toString(), // Map _id to id
        formattedFeedingTime: getLocalTimeWithDST(feeding.feedingTime.toISOString()),
      };
    },

    /**
     * Retrieves all feeding records and includes a formatted feedingTime for each record.
     * @param _parent - Unused parent parameter.
     * @returns An array of all feeding records with adjusted feedingTime for display.
     */
    getFeedings: async () => {
      const feedings = await Feeding.find();

      // Return both original and formatted feedingTime for each record, map _id to id
      return feedings.map(feeding => ({
        ...feeding.toObject(),
        id: feeding._id.toString(), // Map _id to id
        formattedFeedingTime: getLocalTimeWithDST(feeding.feedingTime.toISOString()),
      }));
    },
  },

  Mutation: {
    /**
     * Creates a new feeding record.
     * @param _parent - Unused parent parameter.
     * @param args - Object containing the feeding time, amount, and optional DHA value.
     * @param context - The request context, containing the user information.
     * @returns The newly created feeding record.
     */
    createFeeding: async (
      _parent: undefined,
      args: { feedingTime: string; amount: number; dha?: boolean },
      context: { user: IUser }
    ) => {
      const { feedingTime, amount, dha } = args;

      // Ensure feedingTime is provided in a consistent local time format
      const localFeedingTime = new Date(feedingTime + 'Z');

      // Create and save the new feeding record
      const newFeeding = new Feeding({
        feedingTime: localFeedingTime,
        amount,
        dha,
        addedBy: context.user?.id || 'anonymous-user', // Handle missing context.user for testing
      });
      await newFeeding.save();

      return {
        ...newFeeding.toObject(),
        id: newFeeding._id.toString(), // Map _id to id
      };
    },

    /**
     * Updates an existing feeding record by ID.
     * Converts feedingTime to the user's local time with DST.
     * @param _parent - Unused parent parameter.
     * @param args - Object containing the ID, feedingTime, amount, and DHA.
     * @param context - The request context, containing the user information.
     * @returns The updated feeding record if successful.
     * @throws Error if feedingTime is not provided or if the record is not found.
     */
    updateFeeding: async (
      _parent: undefined,
      args: { id: string; feedingTime: string; amount?: number; dha?: boolean },
      context: { user: IUser }
    ) => {
      const { id, feedingTime, amount, dha } = args;

      // Ensure feedingTime is provided
      if (!feedingTime) {
        throw new Error('Feeding time must be provided when updating');
      }

      // Parse feedingTime as a local date with timezone adjustment
      const localFeedingTime = new Date(feedingTime + 'Z');

      // Construct the update data object with Partial<IFeeding> for type safety
      const updateData: Partial<IFeeding> = {
        feedingTime: localFeedingTime,
        editedBy: context.user?.id || 'anonymous-user',
      };
      if (amount !== undefined) updateData.amount = amount;
      if (dha !== undefined) updateData.dha = dha;

      // Update the feeding record by ID
      const updatedFeeding = await Feeding.findByIdAndUpdate(id, updateData, { new: true });

      if (!updatedFeeding) {
        throw new Error('Feeding record not found');
      }

      return {
        ...updatedFeeding.toObject(),
        id: updatedFeeding._id.toString(), // Map _id to id
      };
    },

    /**
     * Deletes a feeding record by ID.
     * @param _parent - Unused parent parameter.
     * @param args - Object containing the ID of the feeding record to delete.
     * @returns True if deletion was successful; otherwise, false.
     */
    deleteFeeding: async (_parent: undefined, args: { id: string }) => {
      const result = await Feeding.findByIdAndDelete(args.id);
      return result ? true : false;
    },
  },
};
