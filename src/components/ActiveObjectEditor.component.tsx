import React, {useState} from "react"

const ActiveObjectEditor = () => {
    const [value, setValue] = useState(null);

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log(e.target.value)

    }

    return (
        <div>
            <input type="color" onChange={onChange} value={value}/>
        </div>
    )
}

export default ActiveObjectEditor;