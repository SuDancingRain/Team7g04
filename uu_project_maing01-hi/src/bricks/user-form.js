//@@viewOn:imports
import UU5 from "uu5g04";
import { createVisualComponent, useDataList } from "uu5g04-hooks";
import Config from "./config/config";
import Calls from "../calls";
import Lsi from "../routes/user-lsi"
// import UuPlus4UPeopleForms from "uu_plus4upeopleng01-form";
//@@viewOff:imports

const STATICS = {
  //@@viewOn:statics
  displayName: Config.TAG + "UserForm",
  nestingLevel: "bigBoxCollection",
  //@@viewOff:statics
}

export const UserForm = createVisualComponent({
  ...STATICS,

  //@@viewOn:propTypes
  propTypes: {
    shown: UU5.PropTypes.bool,
    selectedUser: UU5.PropTypes.object,
    setFormOpened: UU5.PropTypes.func,
    setSelectedUser: UU5.PropTypes.func,
    handleCreateUser: UU5.PropTypes.func,
    handleUpdateUser: UU5.PropTypes.func,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps


  render(props) {
    //@@viewOn:private
    const userListData = useDataList({
      handlerMap: {
        load: Calls.User.list,
      },
      initialDtoIn: {},
    });


    const userAvailableTags = [];
    if (userListData.data) {
      userListData.data.forEach((user) => {
        userAvailableTags.push({
          value: user.data.id,
          content: user.data.uuIdentity,
          content: user.data.role,
        });
      });
    }


    async function handleOnSave(opt) {
      opt.component.setPending();
      try {
        if (props.selectedUser?.id) await props.handleUpdateUser({ id: props.selectedUser.id, ...opt.values });
        else await props.handleCreateUser(opt.values);
        opt.component.setReady();
        props.setSelectedUser(null);
      } catch (e) {
        opt.component.getAlertBus().setAlert({
          content: <UU5.Bricks.Lsi lsi={Lsi.unsuccessful} />,
          colorSchema: "red",
        });
        opt.component.setReady();
      }
    }
    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    const className = Config.Css.css``;
    let attrs = UU5.Common.VisualComponent.getAttrs(props, className);
    const currentNestingLevel = UU5.Utils.NestingLevel.getNestingLevel(props, STATICS);

    return currentNestingLevel ? (
      <div {...attrs}>

        <UU5.Forms.Form
          labelColWidth={"xs-12 s-12 m-4 l-3 xl-3"}
          valueColWidth={"xs-12 s-12 m-8 l-7 xl-7"}
          onSave={handleOnSave}
          onCancel={() => props.setSelectedUser(null)}
        >
          {/* <UuPlus4UPeopleForms.UseralCard.Input
            name={"uuIdentity"}
            baseUri="https://uuapp.plus4u.net/uu-plus4upeople-maing01/56ac93ddb0034de8b8e4f4b829ff7d0f/"
            label={<UU5.Bricks.Lsi lsi={Lsi.uuIdentity} />}
            value={props.selectedUser?.uuIdentity || ""}
          /> */}
<UU5.Forms.Text
 name={"uuIdentity"}
 label={<UU5.Bricks.Lsi lsi={Lsi.uuIdentity} />}
 value={props.selectedUser?.uuIdentity || ""}
/>
          <UU5.Forms.Select
            name={"role"}
            label={<UU5.Bricks.Lsi lsi={Lsi.role} />}
          >

            <UU5.Forms.Select.Option value="Administrator" />
            <UU5.Forms.Select.Option value="Teacher" />
            <UU5.Forms.Select.Option value="Student" />

          </UU5.Forms.Select>

          <UU5.Bricks.Line size={"s"} />
          <UU5.Forms.Controls
            buttonReset
          />
        </UU5.Forms.Form>



      </div >
    ) : null;
    //@@viewOff:render
  }
});

export default UserForm;