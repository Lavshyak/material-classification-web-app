import {UploadOutlined} from '@ant-design/icons';
import './App.css'
import {Button, Form, Table, type TableProps, Upload, type UploadFile} from "antd";
import {
    type ClassificationTaskResult,
    type KeyValuePairOfstringAndfloat2,
    usePostClassificationClassifysync
} from "./gen";
import {useState} from "react";

type ClassificationTaskResultWithFileName = ClassificationTaskResult & {
    fileName: string
    url: string
}

type ClassificationTaskResultWithFileNameView = ClassificationTaskResultWithFileName & {
    key: React.Key;
}

const columns: TableProps<ClassificationTaskResultWithFileNameView>['columns'] = [
    {
        title: 'Изображение', dataIndex: 'url', key: 'url',
        render: (value: string, record) => {
            console.log(record, value)
            return (
                <div>
                    <img src={value} width={110} height={110} alt="image"/>
                </div>
            )
        }
    },
    {title: 'Файл', dataIndex: 'fileName', key: 'fileName'},

    {
        title: 'Результат',
        dataIndex: 'classNamesPredictionScores',
        key: 'classNamesPredictionScores',
        render: (value: KeyValuePairOfstringAndfloat2[]) =>
            (<div>
                {value.map((pair, idx) => (
                    <div key={idx}>
                        {pair.key} : {pair.value}
                        <br/>
                    </div>
                ))}
            </div>)
    },
    {title: 'Идентификатор задачи', dataIndex: 'taskId', key: 'taskId'},
]

function App() {
    console.log("App")
    //return (<div>hui!</div>)

    const [form] = Form.useForm();

    const normFile = (e: any): UploadFile[] => {
        if (Array.isArray(e)) {
            return e;
        }
        return e?.fileList;
    }

    const [classificationTaskResults, setClassificationTaskResults] = useState<Array<ClassificationTaskResultWithFileName>>([/*{
        taskId: "fakeId",
        fileName: "fakeFile",
        classNamesPredictionScores: [{value: 1, key: "k1"}]
    }*/])

    const m = usePostClassificationClassifysync()

    const onFinish = async (values: any) => {
        console.log('Received values:', values);
        const files: UploadFile[] = values.files;
        form.resetFields()
        const fileObjs = files.map(f => f.originFileObj)
            .filter((value) => value !== undefined)

        for (let fileObj of fileObjs) {
            await m.mutateAsync({
                data: {
                    formFile: fileObj as Blob
                },
            }, {
                onSuccess: (data) => {
                    console.log('Received result');

                    const result = data.data

                    const resultWithFileName = {
                        ...result,
                        fileName: fileObj.name ?? "не указано",
                        url: URL.createObjectURL(fileObj as Blob)
                    } as ClassificationTaskResultWithFileName

                    classificationTaskResults.unshift(resultWithFileName)
                    setClassificationTaskResults(classificationTaskResults)
                }
            })
        }


    };

    return (
        <div>
            <div>
                <Form form={form} name="file-upload" onFinish={onFinish} layout="vertical">
                    <Form.Item
                        style={{borderStyle: "solid"}}
                        name="files"
                        label="Выберите файл"
                        valuePropName="fileList"
                        getValueFromEvent={normFile}
                        rules={[{required: true, message: 'Пожалуйста, загрузите файл!'}]}
                    >
                        <Upload name="files" beforeUpload={() => false} multiple={true}>
                            <Button icon={<UploadOutlined/>}>Выбрать файл</Button>
                        </Upload>
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Отправить
                        </Button>
                    </Form.Item>
                </Form>
            </div>
            <div>
                <label>Результаты:</label>
                <Table<ClassificationTaskResultWithFileNameView>
                    dataSource={classificationTaskResults.map((value, index) => ({...value, key: index}))}
                    columns={columns}/>

            </div>
        </div>

    );
}

export default App
