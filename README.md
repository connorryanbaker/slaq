# slaq


### About slaq

slaq is a live chat application based on Slack. On slaq, users can chat live over multiple separate channels or privately in direct messages.
Check out the [live site!](https://slaqq.herokuapp.com/#/)

### Technologies

slaq was created with React/Redux on the client side and Ruby on Rails/Postgresql server side, using the Rails ActionCable websocket framework to implement live chatting and updates.

![slaq home screen](https://github.com/connorryanbaker/readme_imgs/blob/master/splashcropped.png)

![slaq chat screen](https://github.com/connorryanbaker/readme_imgs/blob/master/chat.png)

### Features

Once logged in and connected to any channel, client-side JS will configure a subscription, opening a websocket connection and streaming all messages broadcast to that particular channel.

``` ruby
class ChatChannel < ApplicationCable::Channel
def subscribed
  channel = Channel.find(params[:id])
  load_user_into_channel(channel)
  stream_for channel
end
```

Messages are loaded 25 at a time with an additional 25 being fetched once the user scrolls to the top of the page. This 'infinite-scroll' feature was implemented with the help of the Kaminari gem and the Waypoint react library.
``` javascript
 fetchNextPage() {
    this.props.fetchPaginatedMessages(this.props.channelId, this.state.page)
      .then(() => {
        this.setState({
          page: this.state.page + 1
        },() => {
          if (this.state.page > 2) {
            window.scroll({
              top: 1175,
              behavior: 'auto'
            });
          }
        });
      });
  }
```
In addition to streaming any messages added to the chat, slaq features live message-updates/message-deletes for any channel subscribers. This was implemented by calling Channel#broadcast_to in the MessagesController, 
``` ruby
channel = Channel.find(@message.messageable_id)
ChatChannel.broadcast_to(channel, {type: 'update_msg', message: @message, channel_id: channel.id})
```
passing along a data-type of "update_msg"/"delete_msg" to trigger a Redux action updating/deleting the particular message.
``` javascript
App.cable.subscriptions.create(
        { channel: 'ChatChannel', id: this.props.channelId },
        {
          received: data => {
            if (this.props.match.params.id == data.channel_id) {
              switch(data.type) {
                case "msg": 
                  this.props.receiveMessage(data.message);
                  break
                case "msgs":
                  if (data.current_user_id === this.props.currentUser.id) {
                    this.props.receiveMessages(data.messages);
                  }
                  break
                case "update_msg":
                  this.props.updateMessage(data.message);
                  break
                case "remove_msg":
                  this.props.removeMessage(data.message);
                  break
              }
            }
          }
```
