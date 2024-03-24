import NavBar from "components/NavBar";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "./styles.module.css";
import { format } from 'date-fns';
import { Heading } from "@chakra-ui/react";
import DenunciaCard from "./DenunciaCard";


declare module 'date-fns' {
	interface FormatOptions {
		timeZone?: string;
	}
}


interface Denuncia {
	matricula: number,
	relato: string,
	recorrencia: string,
	id: number,
	body: string,
	title: string,
	v_fisica: "yes" | "no",
	v_domestica: "yes" | "no",
	v_verbal: "yes" | "no",
	bullying: "yes" | "no",
	assedio: "yes" | "no",
	data_ocorrido: string,
	pontuacao: number,
};


const Coordenacao = () => {

	const [denuncias, setDenuncias] = useState<Array<Denuncia>>([]);
	const navigate = useNavigate();

	const location = useLocation();
	const formatDate = (dateTime: string): string => {
		const newDate = new Date(dateTime);

		return format(newDate, 'dd/MM/yyyy ', {
			timeZone: 'America/Sao_Paulo',
		});
	}



	useEffect(() => {

		const url = 'https://backendd-vk3y.onrender.com/api/v1/denuncia/';
		const token = localStorage.getItem('token');

		if (!token) {

			navigate('/login');
			return;
		}



		axios.get(url, {
			headers: {
				'Authorization': 'Bearer ' + token,
			},

		})
			.then((response) => {

				console.log(response.data);
				setDenuncias(response.data);




			})
			.catch((error) => {

				if (error.response && error.response.status === 401) {
					navigate('/login');
				}
			});



	}, [navigate]);

	return (


		<div className={styles.container}>
			<div className={styles.section}>
				<Heading size="md" textAlign="left" fontSize="1.5em" className={styles.section_header}>
					Últimas Denúncias
				</Heading>
				<div className={styles.cards_container}>

					{denuncias
						? denuncias
							.sort((a, b) => new Date(b.data_ocorrido).getTime() - new Date(a.data_ocorrido).getTime())
							.slice(0, 5)
							.map((denuncia) => (
								<DenunciaCard key={denuncia.id} denuncia={denuncia} />
								
							))
						: null}
				</div>
			</div>

			<div className={styles.section}>
				<Heading size="md" textAlign="left" fontSize="1.5em" className={styles.section_header}>
					Denúncias Mais Graves
				</Heading>
				<div className={styles.cards_container}>
					{denuncias
						? denuncias
							.sort((a, b) => b.pontuacao - a.pontuacao)
							.slice(0, 5)
							.map((denuncia) => (
								<DenunciaCard key={denuncia.id} denuncia={denuncia}/>
							))

						: null}
				</div>
			</div>

			<div className={styles.section}>
				<Heading size="md" textAlign="left" fontSize="1.5em" className={styles.section_header}>
					Todas as denúncias
				</Heading>
				<div className={styles.cards_container}>
					{denuncias
						? denuncias
							.sort((a, b) => b.pontuacao - a.pontuacao)
							.map((denuncia) => (
								<DenunciaCard key={denuncia.id} denuncia={denuncia}/>
							))

						: null}
				</div>
			</div>
		</div>


	)
}

export default Coordenacao;



