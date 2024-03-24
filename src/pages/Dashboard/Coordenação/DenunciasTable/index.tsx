import { useMemo } from "react";
import styles from "./styles.module.css";
import { useTable } from "react-table";

const DenunciasTable = (props: {
    // denuncias
}) => {

    const columns = useMemo(
        () => [
          {
            Header: 'Data',
            accessor: 'data_denuncia',
          },
          {
            Header: 'Recorrência',
            accessor: 'recorrencia',
          },
          {
            Header: 'Número de matrícula',
            accessor: 'matricula',
          },
          {
            Header: 'Tipos de Violência',
            accessor: 'violenceTypes',
          },
        ],
        []
      );

    return (
        <>
        Cu
        </>
    )
}

export default DenunciasTable;