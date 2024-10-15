import React, { useState } from 'react';
import { Flex, Heading, ProgressCircle, Strong, Text } from '@dynatrace/strato-components';
import { DataTable, TableColumn } from '@dynatrace/strato-components-preview';
import { useDqlQuery } from '@dynatrace-sdk/react-hooks';

export const Task2 = () => {
    const [price, setPrice] = useState({});

    const url = `https://dt-url.net/ec2prices`;
    try {
        fetch(url).then(response => {
        if(!response.ok) {
            console.log(response.status.toString());
        }
        setPrice(response.json());
    });
    } catch (error) { 
        console.log(error);
    }
    
    const results = useDqlQuery({
        body: {
            query: `data record(id = "EC2_INSTANCE-56ED6F3F544C46E7", entity.name = "loggregator_trafficcontroller/19b46190-a1a6-47c8-99bb-34606e869b0f", awsInstanceType = "t3.micro"),record(id = "EC2_INSTANCE-7F74BA855D16461C", entity.name = "i-0b046099511f2b0d4", awsInstanceType = "t3.xlarge"),record(id = "EC2_INSTANCE-211185EFB8A5A59D", entity.name = "i-0ac16271a92bd4251", awsInstanceType = "t3.xlarge"),record(id = "EC2_INSTANCE-12E75C1A343DAB90", entity.name = "i-0ac7daa0930d5910e", awsInstanceType = "t3.xlarge"),record(id = "EC2_INSTANCE-9328ACB598C4419A", entity.name = "mysql_proxy/d6974a6e-4108-40f7-aa3b-8c1e41fdd55d", awsInstanceType = "t3.micro"),record(id = "EC2_INSTANCE-97A4036C98C107C6", entity.name = "bosh/0", awsInstanceType = "m5.large"),record(id = "EC2_INSTANCE-E567A65166A68BDA", entity.name = "demoOnDemandSaas_ag", awsInstanceType = "m5.large"),record(id = "EC2_INSTANCE-B8B3B489C7BE7469", entity.name = "uaa/6403cd39-aa28-467a-8b4a-f278d20d39a1", awsInstanceType = "m5.large"),record(id = "EC2_INSTANCE-E937EA86DBEEBE2B", entity.name = "i-0e809b95fe1bf256e", awsInstanceType = "t3.xlarge"),record(id = "EC2_INSTANCE-FF5E8C16035D4177", entity.name = "et-demo-2-lnx9", awsInstanceType = "m5.large")
            | fieldsRename name = entity.name
            | fieldsAdd price = 0 `
        }
    });
        
    const columns: TableColumn[] = [
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
            autoWidth: true
        }
    ]
    return (
        <Flex width='100%' flexDirection='column' justifyContent='center' gap={16}>
           <Heading level={3}>EC2 instances cost overview</Heading>
           <Text>Your EC2 instance costs are <Strong>$00.00</Strong> per hour</Text>
           {results.isLoading && <ProgressCircle/>}
           {results.data && (
            <DataTable data={results.data.records} columns={columns}>
                <DataTable.Pagination/>
            </DataTable>
           )}
        </Flex>
    )
};