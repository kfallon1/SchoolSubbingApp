//plan is if cart is empty to render simple text and if not then render the UI
return (
    //<> </> is react fragment, type of container and also acts as a View
    <>
      {props.bookingItems.length ? ( //ifCartItems has length this will be UI
        <Container>
          <H1 style={{ alignSelf: "center" }}> Your Bookings: </H1>
          {props.bookingItems((data) => {
            return (
              <ListItem
                style={styles.listItem}
                key={Math.random()} //review keys and avators again....
                avatar //this says our list item has a thumbnail or avatar
              >
                <Left //on left hand side of list item we want a thumbnail
                >
                  <Thumbnail //self closing setting the image as the thumbail. Same code as in TeacherCard...line 26
                    source={{
                      uri: data.image
                        ? data.image
                        : "https://www.civictheatre.ie/wp-content/uploads/2016/05/blank-profile-picture-973460_960_720.png",
                    }}
                  />
                </Left>
                <Body
                  styles={styles.body} //Will use the body part to render the name as text component on left and Price/is Available on right
                >
                  <Left>
                    <Text>{data.name}</Text>
                  </Left>
                  <Right>
                    <Text> $ {data.isAvailable}</Text>
                  </Right>
                </Body>
              </ListItem>
            );
          })}

          <View
            style={styles.bottomContainer} //This view will calculate subtotal if wanted and then final 'book'/checkout button
          >
            <Right>
              <Button title="Clear" onPress={() => props.clearCart()} />
            </Right>
            <Right>
              <Button
                title="Confirm Booking"
                onPress={() => props.navigation.navigate("Checkout")} //2nd button here check checkout
              />
            </Right>
          </View>
        </Container>
      ) : (
        //or if empty simple container with text tag don't forget styles to make it more user friendly
        <Container style={styles.emptyContainer}>
          <Text> No Bookings Added </Text>
          <Text> Book Teachers to get started </Text>
        </Container>
      )}
    </> 
  );