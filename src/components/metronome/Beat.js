import "./Beat.css";

const Beat = ({beat, onWheelScroll}) => {
    const createItems = (val) =>
        {
            let list = [];

            for(let i = 0; i < 8; i++){
                const clsName = 'beat-step' + (i < val ? '' : '-disabled');
                list.push(<div className={clsName}></div>);
            }

            return list;
        };

    return (<div>
        <div className='beat'>
            <h1 onWheel={(event) => onWheelScroll(event)}>{beat}</h1>
        </div>
        <div onWheel={(event) => onWheelScroll(event)} className='beat-container'>
            {createItems(beat)}
        </div>
    </div>);
}

export default Beat;