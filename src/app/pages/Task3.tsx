import React, { useEffect, useState } from 'react';
import { Flex, Heading, ProgressCircle, Strong, Text } from '@dynatrace/strato-components';
import { DataTable, TableColumn, TABLE_EXPANDABLE_DEFAULT_COLUMN, TimeseriesChart, convertToTimeseries } from '@dynatrace/strato-components-preview';
import { useDqlQuery } from '@dynatrace-sdk/react-hooks';
import { functions } from '@dynatrace-sdk/app-utils'

export const Task3 = () => {
    const [price, setPrice] = useState();
    let totalCost = 0;
    const name = "EC2_INSTANCE-56ED6F3F544C46E7"


    const getPrice = async () => {
        const response = await functions.call('get-price', { data: { active: true } });
        setPrice(await response.json()) ;
    }

    useEffect(() => {
        getPrice();
    }, [])

    const results = useDqlQuery({
        body: {
            query: `data record(id = "EC2_INSTANCE-56ED6F3F544C46E7", entity.name = "loggregator_trafficcontroller/19b46190-a1a6-47c8-99bb-34606e869b0f", awsInstanceType = "t3.micro"),record(id = "EC2_INSTANCE-7F74BA855D16461C", entity.name = "i-0b046099511f2b0d4", awsInstanceType = "t3.xlarge"),record(id = "EC2_INSTANCE-211185EFB8A5A59D", entity.name = "i-0ac16271a92bd4251", awsInstanceType = "t3.xlarge"),record(id = "EC2_INSTANCE-12E75C1A343DAB90", entity.name = "i-0ac7daa0930d5910e", awsInstanceType = "t3.xlarge"),record(id = "EC2_INSTANCE-9328ACB598C4419A", entity.name = "mysql_proxy/d6974a6e-4108-40f7-aa3b-8c1e41fdd55d", awsInstanceType = "t3.micro"),record(id = "EC2_INSTANCE-97A4036C98C107C6", entity.name = "bosh/0", awsInstanceType = "m5.large"),record(id = "EC2_INSTANCE-E567A65166A68BDA", entity.name = "demoOnDemandSaas_ag", awsInstanceType = "m5.large"),record(id = "EC2_INSTANCE-B8B3B489C7BE7469", entity.name = "uaa/6403cd39-aa28-467a-8b4a-f278d20d39a1", awsInstanceType = "m5.large"),record(id = "EC2_INSTANCE-E937EA86DBEEBE2B", entity.name = "i-0e809b95fe1bf256e", awsInstanceType = "t3.xlarge"),record(id = "EC2_INSTANCE-FF5E8C16035D4177", entity.name = "et-demo-2-lnx9", awsInstanceType = "m5.large")
            | fieldsRename name = entity.name`
            }
    });

    const columns: TableColumn[] = [
        {
            ...TABLE_EXPANDABLE_DEFAULT_COLUMN,
        },
        {
            header: 'ID',
            accessor: 'id',
            autoWidth: true,
        },
        {
            header: 'Entity Name',
            accessor: 'name',
            autoWidth: true,
        },
        {
            header: 'AWS Instance Type',
            accessor: 'awsInstanceType',
            autoWidth: true,
        },
        {
            header: 'Price[$/h]',
            accessor: 'price',
            autoWidth: true,
            cell: ({row}) => {
                const instanceType = row.original.awsInstanceType;
                return (<DataTable.Cell>{price?.[instanceType] || 'N/A'}</DataTable.Cell>);
            },
            columnType: 'number',
            disableSortBy: true
        }
    ]

    results.data?.records.forEach((item) => {
        item != null && price != undefined && item.awsInstanceType != null ? totalCost += price[(item.awsInstanceType).toString()] : 0
    });

    return (
        <Flex width='100%' flexDirection='column' justifyContent='center' gap={16}>
           <Heading level={3}>EC2 instance cost overview</Heading>
           <Text>Your EC2 instance costs are <Strong>${totalCost.toFixed(2)}</Strong> per hour</Text>
           {results.isLoading && <ProgressCircle/>}
           {results.data && (
            <DataTable data={results.data.records} columns={columns} sortable resizable>
                <DataTable.ExpandableRow>
                {({ row }) => {
                    const EC2InstanceUsage = useDqlQuery({
                        body: {
                            query: `data record(CPU = array(28.26,27.94,28.29,28.70,28.63,28.32,28.56,29.35,28.47), dt.entity.ec2_instance = "EC2_INSTANCE-12E75C1A343DAB90", timeframe = timeframe(from: "2023-05-08T11:15:00.000Z", to: "2023-05-08T13:30:00.000Z"), interval = duration(900000000000, unit:"ns")),record(CPU = array(21.16,19.52,20.51,19.42,19.35,19.42,19.97,20.53,19.52), dt.entity.ec2_instance = "EC2_INSTANCE-211185EFB8A5A59D", timeframe = timeframe(from: "2023-05-08T11:15:00.000Z", to: "2023-05-08T13:30:00.000Z"), interval = duration(900000000000, unit:"ns")),record(CPU = array(2.87,2.83,2.86,2.84,2.84,2.87,2.84,2.83,2.87), dt.entity.ec2_instance = "EC2_INSTANCE-56ED6F3F544C46E7", timeframe = timeframe(from: "2023-05-08T11:15:00.000Z", to: "2023-05-08T13:30:00.000Z"), interval = duration(900000000000, unit:"ns")),record(CPU = array(12.07,11.61,11.71,11.04,12.38,12.86,11.87,11.83,13.30), dt.entity.ec2_instance = "EC2_INSTANCE-7F74BA855D16461C", timeframe = timeframe(from: "2023-05-08T11:15:00.000Z", to: "2023-05-08T13:30:00.000Z"), interval = duration(900000000000, unit:"ns")),record(CPU = array(2.32,2.34,2.34,2.33,2.36,2.37,2.34,2.35,2.37), dt.entity.ec2_instance = "EC2_INSTANCE-9328ACB598C4419A", timeframe = timeframe(from: "2023-05-08T11:15:00.000Z", to: "2023-05-08T13:30:00.000Z"), interval = duration(900000000000, unit:"ns")),record(CPU = array(2.23,2.22,2.21,2.24,2.23,2.24,2.24,2.24,2.24), dt.entity.ec2_instance = "EC2_INSTANCE-97A4036C98C107C6", timeframe = timeframe(from: "2023-05-08T11:15:00.000Z", to: "2023-05-08T13:30:00.000Z"), interval = duration(900000000000, unit:"ns")),record(CPU = array(3.33,3.30,3.29,3.36,3.34,3.30,3.32,3.28,3.27), dt.entity.ec2_instance = "EC2_INSTANCE-B8B3B489C7BE7469", timeframe = timeframe(from: "2023-05-08T11:15:00.000Z", to: "2023-05-08T13:30:00.000Z"), interval = duration(900000000000, unit:"ns")),record(CPU = array(1.55,1.49,1.67,1.49,1.51,1.68,1.61,1.38,1.34), dt.entity.ec2_instance = "EC2_INSTANCE-E567A65166A68BDA", timeframe = timeframe(from: "2023-05-08T11:15:00.000Z", to: "2023-05-08T13:30:00.000Z"), interval = duration(900000000000, unit:"ns")),record(CPU = array(12.73,12.12,12.41,12.57,12.22,13.00,13.52,12.35,11.52), dt.entity.ec2_instance = "EC2_INSTANCE-E937EA86DBEEBE2B", timeframe = timeframe(from: "2023-05-08T11:15:00.000Z", to: "2023-05-08T13:30:00.000Z"), interval = duration(900000000000, unit:"ns")),record(CPU = array(53.71,46.32,45.36,43.39,48.75,46.67,41.65,44.62,39.69), dt.entity.ec2_instance = "EC2_INSTANCE-FF5E8C16035D4177", timeframe = timeframe(from: "2023-05-08T11:15:00.000Z", to: "2023-05-08T13:30:00.000Z"), interval = duration(900000000000, unit:"ns"))
                            | filter dt.entity.ec2_instance ==  "${row.id}" `
                        },
                    });
                
                    return (
                        <Flex flexDirection="column">
                            <Heading level={4}>CPU Usage</Heading>
                            {EC2InstanceUsage.isLoading && <ProgressCircle/>}
                            {EC2InstanceUsage.data?.records && (
                            <TimeseriesChart data={convertToTimeseries(EC2InstanceUsage.data?.records, EC2InstanceUsage.data?.types)}> 
                                <TimeseriesChart.Legend hidden={true} />
                            </TimeseriesChart>)
                            }
                        </Flex>
                    );
                    }}
                </DataTable.ExpandableRow>
            </DataTable>
           )}
        </Flex>
    )
};