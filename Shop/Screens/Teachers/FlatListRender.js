<FlatList
                //horizontal
                data={teachers}
                numColumns={2} //numColumns does not support horizontal error,...changes layout?? was = {2}
                renderItem={({ item }) => (
                  <TeacherList //renderItem function here renders the full teacherList js created
                    key={item.id}
                    item={item}
                  />
                )}
                keyExtractor={item.name}
              /> 