import React, { useEffect, useState } from "react";
import CustomModal from "../../components/CustomModal/CustomModal";
import CustomTable from "../../components/CustomTable/CustomTable";
import CustomDropDown from "../../components/CustomDropDown/CustomDropDown";
import { SelectChangeEvent } from "@mui/material";
import { getWineData } from "../../services/Home.service";
import { GetWineDataItemType } from "../../services/interface";
import { TableCols, wineTypes } from "./constants";

const Home: React.FC = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [showModal, setShowModal] = useState<boolean>(false);
    const [data, setData] = useState<GetWineDataItemType[] | null>(null)
    const [selectedType, setSelectedType] = useState<string>('');

    const handleModal = (): void => {
        setShowModal(true);
    };

    const closeModal = (): void => {
        setShowModal(false);
    };

    const handleSelectedItem = (event: SelectChangeEvent<string>): void => {
        setSelectedType(event.target.value)
    }

    useEffect(() => {
        async function fetchData(selectedType: string) {

            try {
                setLoading(true)
                const result = await getWineData(selectedType)
                console.log(result)
                setData(result)
            } catch (error) {
                if (error instanceof Error) {
                    console.log("error in fetching data= ", error)
                }
            } finally {
                setLoading(false)
            }
        }

        if (selectedType) {
            fetchData(selectedType)
        }
    }, [selectedType])

    return (
        <>
            <div className="home-container">
                <h1>Welcome!!!!</h1>
                <button onClick={handleModal}>Fill Details</button>
            </div>
            <div className="dropdown-container">
                <CustomDropDown
                    label={"Select your wine type"}
                    onSelect={handleSelectedItem}
                    value={selectedType}
                    options={wineTypes}
                />
                <div className="table-container">
                    <CustomTable data={data} columns={TableCols} loading={loading} />
                </div>
            </div>
            <CustomModal openModal={showModal} handleCloseModal={closeModal} />
        </>
    );
};

export default Home;