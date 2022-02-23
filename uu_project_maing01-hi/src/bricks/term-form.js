//@@viewOn:imports
import UU5 from "uu5g04";
import { createVisualComponent, useDataList } from "uu5g04-hooks";
import Config from "./config/config";
import Calls from "../calls";
import Lsi from "../routes/term-lsi"
import UserDataList from "./user-data-list";

//@@viewOff:imports

const STATICS = {
  //@@viewOn:statics
  displayName: Config.TAG + "TermForm",
  nestingLevel: "bigBoxCollection",
  //@@viewOff:statics
};

export const TermForm = UserDataList(
  createVisualComponent({
    ...STATICS,

    //@@viewOn:propTypes
    propTypes: {
      shown: UU5.PropTypes.bool,
      selectedTerm: UU5.PropTypes.object,
      setFormOpened: UU5.PropTypes.func,
      setSelectedTerm: UU5.PropTypes.func,
      handleCreateTerm: UU5.PropTypes.func,
      handleUpdateTerm: UU5.PropTypes.func,
      selectedSubject: UU5.PropTypes.object,
    },
    //@@viewOff:propTypes

    //@@viewOn:defaultProps
    defaultProps: {},
    //@@viewOff:defaultProps

    render(props) {
      //@@viewOn:private


      const termListData = useDataList({
        handlerMap: {
          load: Calls.Term.list,
        },
        initialDtoIn: {},
      });


      const termAvailableTags = [];
      if (termListData.data) {
        termListData.data.forEach((term) => {
          termAvailableTags.push({
            value: term.data.id,
            content: term.data.year,
            content: term.data.season,
            content: term.data.subjectId,
            content: term.data.supervisors,
            content: term.data.userList
          });
        });
      }

      const userAvailableTagsStudent = [];
      if (props.data) {
        props.data.forEach((user) => {
          if (user.data.role === "Student") {
            userAvailableTagsStudent.push({
              value: user.data.id,
              content: user.data.name,
            });
          }
        });
      }

    
      const userAvailableTagsTeachers = [];
      if (props.data) {
        props.data.forEach((user) => {
          if(user.data.role === "Teacher"){
          userAvailableTagsTeachers.push({
            value: user.data.id,
            content: user.data.name,
          });
        }
        });
      }

      async function handleOnSave(opt) {
        opt.component.setPending();
        try {
          if (props.selectedTerm?.id) await props.handleUpdateTerm({ id: props.selectedTerm.id, ...opt.values });
          else await props.handleCreateTerm(opt.values);
          opt.component.setReady();
          props.setSelectedTerm(null);
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
            onCancel={() => props.setSelectedTerm(null)}
          >

            <UU5.Forms.Number
              name={"year"}
              label={<UU5.Bricks.Lsi lsi={Lsi.year} />}

              value={props.selectedTerm?.year || ""}
            />

            <UU5.Forms.Select
              name={"season"}
              label={<UU5.Bricks.Lsi lsi={Lsi.season} />}

              value={props.selectedTerm?.season || ""}
            >

              <UU5.Forms.Select.Option value={"winter"} />
              <UU5.Forms.Select.Option value={"summer"} />

            </UU5.Forms.Select>

            <UU5.Forms.TagSelect
          name={"supervisors"}
          label={<UU5.Bricks.Lsi lsi={Lsi.supervisors} />}
          value={props.selectedTerm?.supervisors || props.selectedSubject?.supervisors }
          availableTags={userAvailableTagsTeachers}
          multiple={true}
        />

            <UU5.Forms.Text
              name={"subjectId"}
              label={<UU5.Bricks.Lsi lsi={Lsi.subjectId} />}

              value={props.selectedTerm?.subjectId || props.selectedSubject?.id}
            />

            <UU5.Forms.TagSelect
              name={"userList"}
              label={<UU5.Bricks.Lsi lsi={Lsi.userList} />}
              value={props.selectedTerm?.userList || []}
              availableTags={userAvailableTagsStudent}
              multiple
            />

            <UU5.Bricks.Line size={"s"} />
            <UU5.Forms.Controls
              buttonReset
            />
          </UU5.Forms.Form>



        </div >
      ) : null;
      //@@viewOff:render
    }
  })
);

export default TermForm;