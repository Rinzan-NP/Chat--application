import pusher

pusher_client = pusher.Pusher(
  app_id='1882434',
  key='d961a9f5b862a678e240',
  secret='4836aadd1e23605621ce',
  cluster='ap2',
  ssl=True
)

pusher_client.trigger('my-channel', 'my-event', {'message': 'hello world'})