import './PlaceholderInput.css';

export const PlaceholderSimple = ({ tipo, placeInicial, value, onChange }) => {
    return <input
        type={tipo}
        placeholder={placeInicial}
        className="search-input"
        value={value}
        onChange={onChange}
    />
};

export const PlaceholderDoble = ({
                                     tipo,
                                     placeInicial,
                                     placeFinal,
                                     valueInicial,
                                     valueFinal,
                                     onChangeInicial,
                                     onChangeFinal,
                                     step,
                                     min
                                 }) => {
    const handleKeyDown = (e) => {
        if (e.key === "-" || e.key === "e") {
            e.preventDefault();
        }
    };

    return (
        <div className="rango">
            <input
                type={tipo}
                placeholder={placeInicial}
                value={valueInicial}
                onChange={onChangeInicial}
                step={step}
                min={min}
                max={valueFinal}
                onKeyDown={handleKeyDown}
            />
            <p>-</p>
            <input
                type={tipo}
                placeholder={placeFinal}
                value={valueFinal}
                onChange={onChangeFinal}
                step={step}
                min={valueInicial}
                onKeyDown={handleKeyDown}
            />
        </div>
    );
};

