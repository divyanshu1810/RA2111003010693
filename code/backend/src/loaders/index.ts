import database from './database';
import express from './express';
import Logger from './logger';
import Express from 'express';

export default async ({ expressApp }: { expressApp: Express.Application }): Promise<void> => {
  await database();
  express({ app: expressApp });
  Logger.info('✅ Express loaded');
  Logger.info('✅ All modules loaded!');
};
