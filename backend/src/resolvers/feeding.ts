import { Feeding, IFeeding } from '../models/feeding';
import { IUser } from '../models/users';

export const feedingResolvers = {
  Query: {
    getFeeding: async (_parent: undefined, args: { id: string }) => {
      const feeding = await Feeding.findById(args.id);
      if (!feeding) return null;

      return {
        ...feeding.toObject(),
        id: feeding._id.toString(),
      };
    },

    getFeedings: async () => {
      const feedings = await Feeding.find();
      return feedings.map(feeding => ({
        ...feeding.toObject(),
        id: feeding._id.toString(),
      }));
    },
  },

  Mutation: {
    createFeeding: async (
      _parent: undefined,
      args: { feedingTime: string; amount: number; dha?: boolean },
      context: { user: IUser }
    ) => {
      const { feedingTime, amount, dha } = args;

      // Directly pass feedingTime from frontend to MongoDB
      const newFeeding = new Feeding({
        feedingTime, // Store as-is
        amount,
        dha,
        addedBy: context.user?.id || 'anonymous-user',
      });

      await newFeeding.save();

      return {
        ...newFeeding.toObject(),
        id: newFeeding._id.toString(),
      };
    },

    updateFeeding: async (
      _parent: undefined,
      args: { id: string; feedingTime: Date; amount?: number; dha?: boolean },
      context: { user: IUser }
    ) => {
      const { id, feedingTime, amount, dha } = args;

      if (!feedingTime) {
        throw new Error('Feeding time must be provided when updating');
      }

      // Construct update data without converting feedingTime
      const updateData: Partial<IFeeding> = {
        feedingTime,
        editedBy: context.user?.id || 'anonymous-user',
      };
      if (amount !== undefined) updateData.amount = amount;
      if (dha !== undefined) updateData.dha = dha;

      const updatedFeeding = await Feeding.findByIdAndUpdate(id, updateData, {
        new: true,
      });

      if (!updatedFeeding) {
        throw new Error('Feeding record not found');
      }

      return {
        ...updatedFeeding.toObject(),
        id: updatedFeeding._id.toString(),
      };
    },

    deleteFeeding: async (_parent: undefined, args: { id: string }) => {
      const result = await Feeding.findByIdAndDelete(args.id);
      return result ? true : false;
    },
  },
};
