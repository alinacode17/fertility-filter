import { useState, createContext, useEffect } from 'react';

export const FertilityCalculatorContext = createContext();


export const FertilityCalculatorProvider = ({ children }) => {
    const [value, setValue] = useState({ optage: '', optblasto: 'All', select_optfsh: '', select_optam: '', optattmpt: '' });
    const [patientsTotal, setTotalPatients] = useState('');
    const [treatmentCycle, setTreatmentCycle] = useState('');
    const [treatmentCyclePregancyRate, setTreatmentCyclePregancyRate] = useState('');
    const [treatmentCycleBirthRate, setTreatmentCycleBirthRate] = useState('');
    const [eggCollectionCycles, setEggCollectionCycles] = useState('');
    const [eggCollectionPregancyRate, setEggCollectionPregancyRate] = useState('');
    const [eggCollectionBirthRate, setEggCollectionBirthRate] = useState('');
    const [embrioTransferCycles, setEmbrioTransferCycles] = useState('');
    const [embrioTransferPregnancyRate, setEmbrioTransferPregnancyRate] = useState('');
    const [embrioTransferBirthRate, setEmbrioTransferBirthRate] = useState('');


    useEffect(() => {
        fetch(`http://localhost:5000/fertilityCalculatorResults${value.optblasto}`)
            .then(response => response.json())
            .then(data => displayData(data));
        console.log(value);
    }, [value]);

    const displayData = (data) => {
        setTotalPatients(data.totalPatients);
        setTreatmentCycle(data.treatmentsCyclesStarted.Cycles);
        setTreatmentCyclePregancyRate(data.treatmentsCyclesStarted.PregnancyRate);
        setTreatmentCycleBirthRate(data.treatmentsCyclesStarted.LiveBirthRate);
        setEggCollectionCycles(data.eggCollectionCycles.Cycles);
        setEggCollectionPregancyRate(data.eggCollectionCycles.PregnancyRate);
        setEggCollectionBirthRate(data.eggCollectionCycles.LiveBirthRate);
        setEmbrioTransferCycles(data.embrioTransferCycles.Cycles);
        setEmbrioTransferPregnancyRate(data.embrioTransferCycles.PregnancyRate);
        setEmbrioTransferBirthRate(data.embrioTransferCycles.LiveBirthRate);
    }

    return (
        <FertilityCalculatorContext.Provider
            value={{
                patientsTotal,
                value,
                setValue,
                treatmentCycle,
                treatmentCyclePregancyRate,
                treatmentCycleBirthRate,
                eggCollectionCycles,
                eggCollectionPregancyRate,
                eggCollectionBirthRate,
                embrioTransferCycles,
                embrioTransferPregnancyRate,
                embrioTransferBirthRate
            }}>
            {children}
        </FertilityCalculatorContext.Provider>
    )
}
