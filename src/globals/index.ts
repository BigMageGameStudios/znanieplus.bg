export { Environment } from './config'
export const FileTypes = {
  image: {
    type: 1,
    suportedTypes: ['image/jpeg', 'image/png', 'image/bmp'],
    maxSize: 8 * 1048576
  }
};

export const QRCodeType = {
  table: {
    key: 'table',
    action: `/menu`
  },
  rating: {
    key: 'rating',
    action: `/feedback`
  },
  tracing: {
    key: 'tracing',
    action: `/tracing`
  },
}