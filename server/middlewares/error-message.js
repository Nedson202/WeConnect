const errorMessage = res => res.status(404).json({
  message: 'Business not found',
  error: false
});
export default errorMessage;
