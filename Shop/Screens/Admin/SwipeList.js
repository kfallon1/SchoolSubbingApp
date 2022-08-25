<SwipeListView
            data={props.cartItems}
            renderItem={(data) => {
              <BookingItem
                item={data} //call the bookingItem tag which returns a UI/List View
              />;
            }}
            //Render Hidden Item is the item that appears below top component
            renderHiddenItem={(data) => {
              <View style={styles.hiddenContainer}>
                <TouchableOpacity style={styles.hiddenButton}>
                  <Icon name="trash" color={"white"} size={30} />
                </TouchableOpacity>
              </View>;
            }}
            disableRightSwipe={true} //only allow swipe to left
            previewOpenDelay={3000} //3000ms delay and friction and tension values below also
            friction={1000}
            tension={40}
            leftOpenValue={75}
            stopLeftSwipe={75} //stop left swipe
            rightOpenValue={-75}
          />