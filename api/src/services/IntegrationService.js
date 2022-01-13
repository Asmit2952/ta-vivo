import { Integration, PendingIntegration, CheckIntegration } from '../models';
class IntegrationService {

  static async requestEmailConfirmation({ email, user }) {
    try {
      const uniqueCode = `${user.userId}${Math.random().toString(36).substring(2, 7)}`;
      await PendingIntegration.create({
        data: {
          email: email
        },
        uniqueCode,
        appUserId: user.userId,
        integrationType: 'email'
      });
      return;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Telegram and email for this moment
   * 
  */
  static async create({ newIntegration, user }) {
    try {
      const pendingIntegration = await PendingIntegration.findOne({
        where: {
          uniqueCode: newIntegration.uniqueCode
        }
      });
      if (!pendingIntegration) {
        throw ({ status: 400, message: 'Integration not found' });
      }

      const integration = {
        appUserId: pendingIntegration.appUserId,
        type: pendingIntegration.integrationType,
        userId: user.userId,
        name: pendingIntegration.integrationType === 'email' ? pendingIntegration.data.email  : newIntegration.name,
      };
      const entityCreated = await Integration.create(integration);
      await pendingIntegration.destroy();
      return entityCreated;
    } catch (error) {
      throw error;
    }
  }

  static async update({ id, integration, user }) {
    try {
      const entityUpdated = await Integration.update(integration, {
        where: {
          id,
          userId: user.userId
        }
      });
      return entityUpdated;
    } catch (error) {
      throw error;
    }
  }

  static async getAll({ criterions, user }) {
    try {
      if (criterions.where) {
        criterions.where.userId = user.userId;
      } else {
        criterions.where = { userId: user.userId };
      }

      const { rows } = await Integration.findAndCountAll({
        ...criterions,
        include: [{
          model: CheckIntegration
        }]
      });
      return { rows, count: rows.length };
    } catch (error) {
      throw error;
    }
  }

  static async delete({ id, user }) {
    try {
      const rowCount = await Integration.destroy({
        where: { id, userId: user.userId }
      });
      return { count: rowCount };
    } catch (error) {
      throw error;
    }
  }

}

export default IntegrationService;