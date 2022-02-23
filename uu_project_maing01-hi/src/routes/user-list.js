//@@viewOn:imports
import UU5 from "uu5g04";
import "uu5g04-bricks";
import { createVisualComponent,useState,useDataList} from "uu5g04-hooks";
import Uu5Tiles from "uu5tilesg02";
import "uu_plus4u5g01-bricks";
import Config from "./config/config.js";
import Calls from "../calls";
import Lsi from "./user-lsi";
import UserForm from "../bricks/user-form"
import AssignmentDataList from "../bricks/assignment-data-list.js";
//@@viewOff:imports

const STATICS = {
  //@@viewOn:statics
  displayName: Config.TAG + "UserList",
  nestingLevel: "bigBoxCollection",
  //@@viewOff:statics
};

export const UserList = AssignmentDataList(
createVisualComponent({
  ...STATICS,

  //@@viewOn:propTypes
  propTypes: {},
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private

    const [selectedUser, setSelectedUser] = useState(null);
    const [userToDelete, setUserToDelete] = useState(null);

    const userListData = useDataList({
      handlerMap: {
        load: Calls.User.list,
        createItem: Calls.User.create,
      },
      itemHandlerMap: {
        update: Calls.User.update,
        delete: Calls.User.delete,
      },
      initialDtoIn: {},
    });


    const assignmentAvailableTags = [];
    if (props.data) {
      props.data.forEach((assignment) => {
        assignmentAvailableTags.push({
          value: assignment.data.id,
          content: assignment.data.name,
        });
      });
    }


    //@@viewOff:private

    //@@viewOn:interface

    function handleCreateUser(newUserData) {
      return userListData.handlerMap.createItem(newUserData);
    }

    function handleUpdateUser(updatedUserData) {
      return selectedUser.handlerMap.update(updatedUserData);
    }

    async function handleUserDelete() {
      await userToDelete.handlerMap.delete({ id: userToDelete.data.id });
      setUserToDelete(null);
      window.location.reload();
    }
    //@@viewOff:interface

    //@@viewOn:render
    const className = Config.Css.css``;
    const attrs = UU5.Common.VisualComponent.getAttrs(props, className);
    const currentNestingLevel = UU5.Utils.NestingLevel.getNestingLevel(props, STATICS);

    function getCollumns() {
      return [
        
        {
          header: <UU5.Bricks.Lsi lsi={Lsi.uuIdentity}/>,
          cell: (cellProps) => cellProps.data.data.uuIdentity,
        },
        {
          header: <UU5.Bricks.Lsi lsi={Lsi.role}/>,
          cell: (cellProps) => cellProps.data.data.role,
        },

        {
          cell: (cellProps) => {
            if (cellProps.data.state.includes("pending")) {
              return <UU5.Bricks.Loading />
            } else {
              return (
                <>
                  <UU5.Bricks.Button
                    colorSchema="blue"
                    onClick={() => { UU5.Environment.getRouter().setRoute("userDetail", { id: cellProps.data.data.id }) }}
                  >
                    <UU5.Bricks.Icon
                      icon="mdi-magnify"
                    />
                  </UU5.Bricks.Button>
                  <UU5.Bricks.Button
                    colorSchema="blue"
                    onClick={() => setSelectedUser(cellProps.data)}
                  >
                    <UU5.Bricks.Icon icon="mdi-pencil" />
                  </UU5.Bricks.Button>
                  <UU5.Bricks.Button
                    colorSchema="red"
                    onClick={() => setUserToDelete(cellProps.data)}
                  >
                    <UU5.Bricks.Icon
                      icon="mdi-close"
                    />
                  </UU5.Bricks.Button>
                </>
              );
            }
          },
        },
      ];
    }
    const Filter =[
      
    ]
    const Sorter =[
      
    ]

    return currentNestingLevel ? (
      <div {...attrs}>
        {
          selectedUser && (
            <UU5.Bricks.Modal
              header={<UU5.Bricks.Lsi lsi={props.selectedUser?.id ? Lsi.updateUser : Lsi.createUser} />}
              shown={!!selectedUser}
              onClose={() => setSelectedUser(null)}
            >
              <UserForm
                selectedUser={selectedUser.data}
                setSelectedUser={setSelectedUser}
                handleCreateUser={handleCreateUser}
                handleUpdateUser={handleUpdateUser}
              />
            </UU5.Bricks.Modal>
          )
        }

        {userToDelete && (
          <UU5.Bricks.Modal
            header={"Confirm User Deletion"}
            shown={true}
            onClose={() => setUserToDelete(null)}
          >
            <div className={"center uu5-common-padding-s"}>
              <UU5.Bricks.Button onClick={() => setUserToDelete(null)}>
                Refuse
              </UU5.Bricks.Button>
              {""}
              <UU5.Bricks.Button colorSchema={"red"} onClick={handleUserDelete}>
                Confirm
              </UU5.Bricks.Button>
            </div>
          </UU5.Bricks.Modal>
        )
        }
        
        <UU5.Bricks.Container>
          <Uu5Tiles.ControllerProvider data={userListData.data || []} >
        <UU5.Bricks.Button colorSchema={"green"} onClick={()=> setSelectedUser({data: {} })}>
          <UU5.Bricks.Icon icon={"mdi-plus"} />
          <UU5.Bricks.Lsi lsi={Lsi.create} />
        </UU5.Bricks.Button>
            <Uu5Tiles.List columns={getCollumns()} rowAlignment="center" rowHeight={150} />
          </Uu5Tiles.ControllerProvider>
        </UU5.Bricks.Container>
      </div>
    ) : null;
    //@@viewOff:render
  },
})
);

export default UserList;
