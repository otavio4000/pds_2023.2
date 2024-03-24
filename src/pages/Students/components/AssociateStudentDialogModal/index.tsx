import styles from "./styles.module.css";
import { 
    AlertDialog,
    AlertDialogOverlay,
    AlertDialogContent,
    AlertDialogBody,
    AlertDialogHeader,
    AlertDialogFooter,
    Button,
    useToast
} from "@chakra-ui/react";
import { useRef, useState } from "react";
import api from "services/api";

interface student_info {
    id: number,
    matricula: string,
    nome: string,
    cpf: string,
    data_nascimento: string,
    turma_ano: string,
    historico_academico: string | null,
    historico_faltas: number,
    observacoes: string,
    contato_substancias_ilicitas: string,
    situacao_familiar: string,
    engajamento_familia: string
}


const AssociateStudentDialogModal = (props: {
    isOpen: boolean,
    onClose: () => void,
    student: student_info
}) => {

    const [isLoading, setIsLoading] = useState(false);
    const { isOpen, onClose, student } = props; 
    const cancelRef = useRef<HTMLElement | null>(null); 
    const toast = useToast(); 

    const handleAssociate = async () => {

        setIsLoading(true);
        try {
            console.log(localStorage.getItem("token"))
            const token = localStorage.getItem("token");
            const response = await api.patch(`/responsavel/associate/${student.id}/`, {}, {
                headers: {
                    'Authorization': 'Bearer ' + token,
                    'Content-Type': 'application/json'
                }
            });

            toast({
                title: 'Aluno associado.',
                description: `O aluno ${student.nome} foi associado a você no sistema.`,
                status: 'success',
                duration: 4000,
                isClosable: true,
                onCloseComplete: () => {
                    setIsLoading(false);
                    onClose(); 
                },
                containerStyle: {
                    color: "white"
                }
              })

        } catch (error) {

            toast({
                title: 'Aconteceu algo de errado!',
                description: `Não conseguimos completar a associação do aluno ${student.nome} a você.`,
                status: 'error',
                duration: 4000,
                isClosable: true,
                onCloseComplete: () => {
                    setIsLoading(false);
                    onClose(); 
                },
                containerStyle: {
                    color: "white"
                }
              })

        }
    }

    return (
        <AlertDialog
        isOpen={isOpen}
        onClose={onClose}
        leastDestructiveRef={cancelRef}
      >
        <AlertDialogOverlay>
          <AlertDialogContent className={styles.body} bg="white">
            <AlertDialogHeader fontSize='lg' fontWeight='bold'>
              Associar aluno a mim
            </AlertDialogHeader>

            <AlertDialogBody>
              Você tem certeza que deseja associar o aluno <b>{ student.nome }</b> a você no sistema?
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button onClick={onClose}>
                CANCELAR
              </Button>
              <Button 
              color="white.50"
              bg="pink.50"
              _hover={{ bgColor: "pink.100" }}
              _active={{ bgColor: "pink.200" }}
              isLoading={isLoading} 
              onClick={handleAssociate} ml={3}>
                ASSOCIAR A MIM
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    )
}

export default AssociateStudentDialogModal;