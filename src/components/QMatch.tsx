import { Card, CardTitle, Col, Container, Row } from 'react-bootstrap';
import { useEffect, useState } from 'react';
//@ts-ignore
import randomColor from 'randomcolor';

const QMatch = ({
    options,
    answers,
    particularQuestionSubmission,
    setParticularQuestionSubmission,
    question_index,
    leftColorForMatchQ,
    setLeftColorForMatchQ,
    mapForMatchQ,
    setMapForMatchQ,
    mapReverseForMatchQ,
    setMapReverseForMatchQ,
}: {
    options: String[];
    answers: String[];
    particularQuestionSubmission: string[];
    setParticularQuestionSubmission: any;

    question_index: number;
    leftColorForMatchQ: any;
    setLeftColorForMatchQ: any;
    mapForMatchQ: any;
    setMapForMatchQ: any;
    mapReverseForMatchQ: any;
    setMapReverseForMatchQ: any;
}) => {
    const [left, setLeft] = useState<number>(0); //1,2,3,4
    const [right, setRight] = useState<number>(0);

    const [leftColors, setLeftColors] = useState<{ [key: number]: string }>({}); //1,2,3,4
    // const [rightColors, setRightColors] = useState<{ [key: number]: string }>(
    //     {}
    // );

    const [map, setMap] = useState<{ [key: number]: number }>({});
    const [mapReverse, setMapReverse] = useState<{ [key: number]: number }>({});

    const [color, setColor] = useState<string>('');

    useEffect(() => {
        var temp: { [key: number]: number } = {};

        // if (particularQuestionSubmission.length !== options.length) {
        for (let i = 0; i < options.length; i++) {
            // if (particularQuestionSubmission[i]) {
            //     temp[i + 1] = i;
            // }
            temp[i + 1] = 0;
        }

        if (mapForMatchQ[question_index]) {
            setMap(mapForMatchQ[question_index]);
        } else {
            setMap(temp);
        }

        if (leftColorForMatchQ[question_index]) {
            setLeftColors(leftColorForMatchQ[question_index]);
        } 

        if (mapReverseForMatchQ[question_index]) {
            setMapReverse(mapReverseForMatchQ[question_index]);
        } else {
            setMapReverse(temp);
        }
        // } else {
        //     for (let i = 0; i < options.length; i++) {
        //         if (particularQuestionSubmission[i] !== 'Not Done') {
        //             temp[i + 1] = particularQuestionSubmission[i];
        //         } else {
        //             temp[i + 1] = 0;
        //         }
        //     }
        // }

        console.log(leftColorForMatchQ);
        console.log(mapForMatchQ);
        console.log(mapReverseForMatchQ);

        // setLeftColors(leftColorForMatchQ[question_index]);

        // setMap(mapForMatchQ[question_index]);

        // setMapReverse(mapReverseForMatchQ[question_index]);
    }, []);

    useEffect(() => {
        setColor(randomColor());
    }, [left]);

    const leftHandler = (index: number) => {
        setLeft(index + 1);
        setRight(0);
    };

    const makeConnection = (index: number) => {
        if(left === 0) return
        setRight(index + 1);

        if (mapReverse[index + 1] !== 0) {
            setLeftColors({
                ...leftColors,
                [left]: color,
                [mapReverse[index + 1]]: '',
            });
        } else {
            setLeftColors({ ...leftColors, [left]: color });
        }

        console.log(right);

        setMap({ ...map, [left]: index + 1 });
        setMapReverse({ ...mapReverse, [right]: 0, [index + 1]: left });
    };

    useEffect(() => {
        setMapForMatchQ({ ...mapForMatchQ, [question_index]: map });

        let temp: string[] = [];
        const keys = Object.keys(map);
        console.log('aftering objecting:', keys);

        for (var i = 0; i < keys.length; i++) {
            if (map[i + 1] === 0) {
                temp.push('Not Done');
            } else {
                const ans: String = answers[map[i + 1] - 1];
                temp.push(ans.toString());
            }
        }

        setParticularQuestionSubmission(temp);
        console.log(particularQuestionSubmission);
    }, [map]);

    useEffect(() => {
        setLeftColorForMatchQ({
            ...leftColorForMatchQ,
            [question_index]: leftColors,
        });
    }, [leftColors]);

    // useEffect(() => {
    //     setMapForMatchQ({ ...mapForMatchQ, [question_index]: map });

    //     let temp: string[] = [];
    //     const keys = Object.keys(map);

    //     for (var i = 0; i < keys.length; i++) {
    //         const key:number = keys[i];
    //         const ans = answers[map[i+1]];
    //         temp.push(ans.toString());
    //     }

    //     setParticularQuestionSubmission(temp);
    //     console.log(particularQuestionSubmission);

    // }, [map])

    useEffect(() => {
        setMapReverseForMatchQ({
            ...mapReverseForMatchQ,
            [question_index]: mapReverse,
        });
    }, [mapReverse]);

    return (
        <Container className="d-flex justify-content-around flex-wrap align-content-around">
            <Row>
                <Col>
                    {options.map((o: String, index: number) => {
                        return (
                            <Card
                                role="button"
                                key={index}
                                className="mt-5"
                                style={{
                                    width: '18rem',
                                    backgroundColor:
                                        // leftColors[index+1]
                                        left === index + 1
                                            ? color
                                            : leftColors[index + 1],
                                }}
                                onClick={() => leftHandler(index)}
                            >
                                <CardTitle className="p-3 m-0 d-flex justify-content-center align-items-center">
                                    {o}
                                </CardTitle>
                            </Card>
                        );
                    })}
                </Col>
                <Col>
                    {answers.map((a: String, index: number) => {
                        return (
                            <Card
                                role="button"
                                key={index}
                                className="mt-5"
                                style={{
                                    width: '18rem',
                                    backgroundColor:
                                        // rightColors[index+1]
                                        right === index + 1
                                            ? leftColors[left]
                                            : leftColors[mapReverse[index + 1]],
                                }}
                                onClick={() => makeConnection(index)}
                            >
                                <CardTitle className="p-3 m-0 d-flex justify-content-center align-items-center">
                                    {a}
                                </CardTitle>
                            </Card>
                        );
                    })}
                </Col>
            </Row>
        </Container>
    );
};

export default QMatch;
