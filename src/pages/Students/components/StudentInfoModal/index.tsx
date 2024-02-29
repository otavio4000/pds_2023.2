import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader, 
    ModalCloseButton,
    ModalBody,
    ModalFooter,
    Avatar
} from "@chakra-ui/react"
import styles from "./styles.module.css";

interface TutorInfo {
    name: string, 
    tel: string
}

interface StudentInfo {
    name: string,
    matricula: string,
    nascimento: string, 
    turma: string, 
    tutor1: TutorInfo,
    tutor2: TutorInfo
}

const StudentInfoModal = (props: {
    student: StudentInfo,
    isOpen: boolean, 
    onClose: () => void
}) => {

    const { student, isOpen, onClose } = props; 

    return (
        <Modal isOpen={isOpen} onClose={onClose} size="md">
            <ModalOverlay />
            <ModalContent bg="white" className={styles.container}>
                <Avatar size="xl" name={student.name} />
                { student.name }
                <ModalCloseButton />
                <ModalBody className={styles.modal_body}>
                    <div className={styles.aluno_info}>
                        <div style={{
                            display: "flex",
                            justifyContent: "space-between"
                        }}>
                            <span>  
                                <b>Nascimento:</b> {student.nascimento}
                            </span>
                            <span>
                                <b>Turma:</b> {student.turma}
                            </span>
                        </div>
                        <span>
                            <b>Matrícula</b>: {student.matricula}
                        </span>
                    </div>
                    <div className={styles.tutors_info}>
                        <div className={styles.tutor}>
                            <b>Tutor 1:</b> <br />
                            <div>
                                <span>
                                    <b>Nome:</b> {student.tutor1.name}
                                </span>
                                <span>
                                    <b>Contato:</b> {student.tutor1.tel}
                                </span>
                            </div>
                        </div>
                        <div className={styles.tutor}>
                            <b>Tutor 2:</b> <br />
                            <div>
                                <span>
                                    <b>Nome:</b> {student.tutor2.name}
                                </span>
                                <span>
                                    <b>Contato:</b> {student.tutor2.tel}
                                </span>
                            </div>
                        </div>
                    </div>
                </ModalBody>
            </ModalContent>
        </Modal>
    )
}

export default StudentInfoModal;