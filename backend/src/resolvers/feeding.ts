import { Feeding, IFeeding } from '../models/feeding';
import { IUser } from '../models/user';
import dayjs from 'dayjs';

export const feedingResolvers = {
  Query: {
    getFeeding: async (_parent: undefined, args: { id: string }) => {
      try {
        const feeding = await Feeding.findById(args.id);
        if (!feeding) {
          console.error(`Feeding record not found for ID: ${args.id}`);
          throw new Error('Feeding record not found');
        }

        return {
          ...feeding.toObject(),
          id: feeding._id.toString(),
        };
      } catch (error) {
        console.error('Error retrieving feeding record:', error);
        throw new Error('Failed to retrieve feeding record');
      }
    },

    getFeedings: async () => {
      try {
        const feedings = await Feeding.find();
        return feedings.map(feeding => ({
          ...feeding.toObject(),
          id: feeding._id.toString(),
        }));
      } catch (error) {
        console.error('Error retrieving feeding records:', error);
        throw new Error('Failed to retrieve feeding records');
      }
    },

    getTodaysFeedings: async () => {
      const startOfDay = dayjs().startOf('day').toDate();
      const endOfDay = dayjs().endOf('day').toDate();
      return Feeding.find({ feedingTime: { $gte: startOfDay, $lte: endOfDay } });
    },
  },

  Mutation: {
    createFeeding: async (
      _parent: undefined,
      args: { feedingTime: string; amount: number; dha?: boolean },
      context: { user: IUser }
    ) => {
      const { feedingTime, amount, dha } = args;

      try {
        const newFeeding = new Feeding({
          feedingTime,
          amount,
          dha,
          addedBy: context.user?.id || 'anonymous-user',
        });

        await newFeeding.save();

        return {
          ...newFeeding.toObject(),
          id: newFeeding._id.toString(),
        };
      } catch (error) {
        console.error('Error creating feeding record:', error);
        throw new Error('Failed to create feeding record');
      }
    },

    updateFeeding: async (
      _parent: undefined,
      args: { id: string; feedingTime: Date; amount?: number; dha?: boolean },
      context: { user: IUser }
    ) => {
      const { id, feedingTime, amount, dha } = args;

      if (!feedingTime) {
        console.warn('Feeding time must be provided when updating');
        throw new Error('Feeding time must be provided when updating');
      }

      try {
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
          console.error(`Feeding record not found for ID: ${id}`);
          throw new Error('Feeding record not found');
        }

        return {
          ...updatedFeeding.toObject(),
          id: updatedFeeding._id.toString(),
        };
      } catch (error) {
        console.error('Error updating feeding record:', error);
        throw new Error('Failed to update feeding record');
      }
    },

    deleteFeeding: async (_parent: undefined, args: { id: string }) => {
      try {
        const result = await Feeding.findByIdAndDelete(args.id);
        if (!result) {
          console.error(`Feeding record not found for ID: ${args.id}`);
          throw new Error('Feeding record not found');
        }
        return true;
      } catch (error) {
        console.error('Error deleting feeding record:', error);
        throw new Error('Failed to delete feeding record');
      }
    },
  },
};
