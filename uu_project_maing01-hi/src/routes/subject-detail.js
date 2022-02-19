//@@viewOn:imports
import UU5 from "uu5g04";
import "uu5g04-bricks";
import { createVisualComponent, useDataObject, useState, useDataList } from "uu5g04-hooks";
import "uu_plus4u5g01-bricks";
import Uu5Tiles from "uu5tilesg02";
import Config from "./config/config.js";
import Calls from "../calls.js";
import subjectLsi from "./subject-lsi";
import termLsi from "./term-lsi"
import TermForm from "../bricks/term-form"

//@@viewOff:imports

const STATICS = {
  //@@viewOn:statics
  displayName: Config.TAG + "SubjectDetail",
  nestingLevel: "bigBoxCollection",
  //@@viewOff:statics
};

export const SubjectDetail = createVisualComponent({
  ...STATICS,

  //@@viewOn:propTypes
  propTypes: {

    subjectId: UU5.PropTypes.string,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps


  render(props) {
    //@@viewOn:private
    const subjectData = useDataObject({
      handlerMap: {
        load: Calls.Subject.get,
      },
      initialDtoIn: {
        id: props.subjectId || props.params.id,
      },
    });

    const [selectedTerm, setSelectedTerm] = useState(null);
    const [termToDelete, setTermToDelete] = useState(null);

    const termListData = useDataList({
      handlerMap: {
        load: Calls.Term.list,
        createItem: Calls.Term.create,
      },
      itemHandlerMap: {
        update: Calls.Term.update,
        delete: Calls.Term.delete,
      },
      initialDtoIn: {},

    });

    const termAvailableTags = [];
    if (termListData.data) {
      termListData.data.forEach((term) => {
        termAvailableTags.push({
          value: term.data.subjectId,
          content: term.data.subjectId,
        });
      });
    }

    //@@viewOff:private

    //@@viewOn:interface
    function handleCreateTerm(newTermData) {
      return termListData.handlerMap.createItem(newTermData);
    }

    function handleUpdateTerm(updatedTermData) {
      return selectedTerm.handlerMap.update(updatedTermData);
    }

    async function handleTermDelete() {
      await termToDelete.handlerMap.delete({ id: termToDelete.data.id });
      setTermToDelete(null);
      window.location.reload();
    }

    //@@viewOff:interface

    //@@viewOn:render
    const className = Config.Css.css``;
    const attrs = UU5.Common.VisualComponent.getAttrs(props, className);
    const currentNestingLevel = UU5.Utils.NestingLevel.getNestingLevel(props, STATICS);

    function getResult() {
      let result;

      if (subjectData.state.includes("pending")) {
        result = <UU5.Bricks.Loading />;
      } else if (subjectData.state.includes("error")) {
        result = <UU5.Common.Error errorData={subjectData.errorData} />;
      } else {
        if (currentNestingLevel) {
          result = (
            <UU5.Bricks.Block colorScheme="blue" card={"content"}>

              <b> <UU5.Bricks.Lsi lsi={subjectLsi.name} /> </b> : {subjectData.data.name}
              <br />
              <b> <UU5.Bricks.Lsi lsi={subjectLsi.description} /> </b> : {subjectData.data.description}
              <br />
              <b> <UU5.Bricks.Lsi lsi={subjectLsi.credits} /> </b> : {subjectData.data.credits}
              <br />
              <b> <UU5.Bricks.Lsi lsi={subjectLsi.supervisor} /> </b> : {subjectData.data.supervisor}
              <br />
              <b> <UU5.Bricks.Lsi lsi={subjectLsi.degree} /> </b> : {subjectData.data.degree}
              <br />
              <b> <UU5.Bricks.Lsi lsi={subjectLsi.language} /> </b> : {subjectData.data.language}

            </UU5.Bricks.Block>

          );
        } else {
          result = (
            <UU5.Bricks.Link
              onClick={() => UU5.Environment.getRouter().setRoute("subjectDetail", { id: props.subjectId })}
            >
              {subjectData.data.name}
            </UU5.Bricks.Link>
          );
        }
      }
      return result;
    }


    function getCollumns() {
      return [
        {
          header: <UU5.Bricks.Lsi lsi={termLsi.year} />,
          sorterKey: "nameAsc",
          cell: (cellProps) => cellProps.data.data.year,

        },

        {
          header: <UU5.Bricks.Lsi lsi={termLsi.season} />,
          cell: (cellProps) => cellProps.data.data.season,
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
                    onClick={() => { UU5.Environment.getRouter().setRoute("termDetail", { id: cellProps.data.data.id }) }}
                  >
                    <UU5.Bricks.Icon
                      icon="mdi-magnify"
                    />
                  </UU5.Bricks.Button>
                  <UU5.Bricks.Button
                    colorSchema="blue"
                    onClick={() => setSelectedTerm(cellProps.data)}
                  >
                    <UU5.Bricks.Icon icon="mdi-pencil" />
                  </UU5.Bricks.Button>
                  <UU5.Bricks.Button
                    colorSchema="red"
                    onClick={() => setTermToDelete(cellProps.data)}
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
    const Filter = [
      {
        key: "subjectId",
        label: { cs: "Kod předmětu", en: "Subject Id" },
        filterFn: (item, value) => {
          console.log(item, value[0])
          return item.data.subjectId.includes(value[0]);
        },
        component: (
          <UU5.Forms.TagSelect
            name={"subjectId"}
            label={<UU5.Bricks.Lsi lsi={termLsi.subjectId} />}
            availableTags={termAvailableTags}
            multiple={false}
            required={true}
          />
        ),
        getValueLabel: (value) => {
          let termObject = termAvailableTags.find((termOption) => termOption.value === value[0]);
          return termObject.content;
        },
      },
    ]
    const Sorter = [

    ]


    return currentNestingLevel ? (

      <div {...attrs}>

        {
          getResult()
        }
        <UU5.Bricks.Line />

        {
          selectedTerm && (
            <UU5.Bricks.Modal
              header={<UU5.Bricks.Lsi lsi={props.selectedTerm?.id ? termLsi.updateTerm : termLsi.createTerm} />}
              shown={!!selectedTerm}
              onClose={() => setSelectedTerm(null)}
            >
              <TermForm
                selectedTerm={selectedTerm.data}
                selectedSubject={subjectData.data}
                setSelectedTerm={setSelectedTerm}
                handleCreateTerm={handleCreateTerm}
                handleUpdateTerm={handleUpdateTerm}
              />
            </UU5.Bricks.Modal>
          )
        }

        {termToDelete && (
          <UU5.Bricks.Modal
            header={"Confirm Term Deletion"}
            shown={true}
            onClose={() => setTermToDelete(null)}
          >
            <div className={"center uu5-common-padding-s"}>
              <UU5.Bricks.Button onClick={() => setTermToDelete(null)}>
                Refuse
              </UU5.Bricks.Button>
              {""}
              <UU5.Bricks.Button colorSchema={"red"} onClick={handleTermDelete}>
                Confirm
              </UU5.Bricks.Button>
            </div>
          </UU5.Bricks.Modal>
        )
        }

        <UU5.Bricks.Container>
          <Uu5Tiles.ControllerProvider data={termListData.data || []} filters={Filter} >
            <UU5.Bricks.Button colorSchema={"green"} onClick={() => setSelectedTerm({ data: {} })}>
              <UU5.Bricks.Icon icon={"mdi-plus"} />
              <UU5.Bricks.Lsi lsi={termLsi.create} />
            </UU5.Bricks.Button>
            <Uu5Tiles.FilterBar />
            <Uu5Tiles.List columns={getCollumns()} rowAlignment="center" rowHeight={150}  />
          </Uu5Tiles.ControllerProvider>
        </UU5.Bricks.Container>
      </div>
    ) : null;

    //@@viewOff:render
  },
});

export default SubjectDetail;
